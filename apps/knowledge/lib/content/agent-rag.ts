import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'agent-rag',
  title: 'RAG Authorization',
  description:
    'Securing retrieval-augmented generation pipelines so AI agents only retrieve documents the requesting user is authorized to see — covering architecture patterns, Auth0 FGA integration, and production guidance.',
  tags: ['RAG', 'FGA', 'Auth0', 'authorization', 'retrieval', 'LangChain', 'LlamaIndex', 'ReBAC'],
  icon: '📄',
  hasDiagram: true,
  diagramPrompt:
    'Three-layer pipeline diagram. Top layer: AI Agent (robot icon) sends query. Middle layer: Authorization Checkpoint (lock icon, labeled "FGA BatchCheck") sits between the Vector DB (cylinder) and the LLM (brain icon). Bottom: two paths — left path labeled "Unauthorized docs" with an X and a red arrow stopping before the LLM, right path labeled "Authorized docs only" with a green arrow entering the LLM context window. Warm amber and cream palette, flat technical style, white background.',
  cards: [
    {
      heading: 'The RAG Authorization Problem',
      paragraphs: [
        'Vector databases answer one question extremely well: which chunks of text are most semantically similar to this query? They are built for relevance, not access control. A junior analyst querying a finance AI assistant triggers a similarity search that may surface executive compensation documents, board meeting notes, or M&A deal memos — not because the system is misconfigured, but because those documents are semantically relevant to the query. Relevance and authorization are orthogonal problems, and conflating them is the root cause of data leakage in naive RAG deployments.',
        '!! The failure mode is not theoretical. At low retrieval depth (top-K = 5), a single highly relevant restricted document can consume most of the LLM\'s context window before any authorization check occurs. By the time a post-hoc filter runs, the unauthorized content is already in the model\'s working memory. The LLM has already processed it — and in multi-turn conversations, that context persists.',
        'Three industry drivers are accelerating this from edge case to systemic risk: multi-tenancy (enterprise AI assistants serving users with different clearance levels from a shared corpus), regulatory pressure (GDPR Article 25 data minimization, CCPA purpose limitation, SOX data access controls, HIPAA minimum necessary standard all apply to AI-mediated data access), and scale (post-hoc filtering that works for 100 documents breaks at 100,000).',
      ],
      labeledCallouts: [
        {
          label: 'The Failure Mode',
          labelColor: 'rose',
          text: 'Junior analyst queries finance AI → vector DB returns executive compensation docs because they are semantically similar to the query → LLM generates a response using data the analyst was never authorized to see. The retriever does not know about access control. The LLM does not know what it should not know.',
        },
        {
          label: 'What Does NOT Work: Prompt Instructions',
          labelColor: 'amber',
          text: 'System prompt instructions like "do not reveal confidential information" are not access control. If an unauthorized document reaches the LLM context window, the model has already processed it. Prompt-level filtering is intent, not enforcement. Compliant model behavior in testing does not guarantee compliant behavior under adversarial prompting or jailbreak attempts.',
        },
        {
          label: 'What Does NOT Work: Post-Hoc Filtering at Scale',
          labelColor: 'amber',
          text: 'Retrieving top-K documents and then filtering by permission after the fact has two failure modes: at low K, the filtered result set may be empty (degrading answer quality to zero), and unauthorized vectors still influenced the similarity scoring even if they are discarded before the LLM sees them. Semantic contamination from unauthorized documents is baked into the ranked list.',
        },
      ],
    },
    {
      heading: 'Architecture Patterns: Where Does Auth Happen?',
      paragraphs: [
        'There are four distinct insertion points for authorization in a RAG pipeline. The choice of pattern determines both the security properties and the performance characteristics of the system. Two patterns are anti-patterns at scale. One is the current recommended approach. One is an emerging advanced option for specific infrastructure configurations.',
        'Philip Windley (Jan 2026) articulates the division of responsibility clearly: "Authorization systems decide what is allowed. Databases enforce which data may be retrieved. Prompts express intent, not policy. Language models generate responses within boundaries they did not define." Each component does one job. No component substitutes for another.',
      ],
      timeline: [
        {
          label: 'Pattern 1',
          title: 'Post-Retrieval Filtering (Naive)',
          description: 'Retrieve unrestricted top-K documents from the vector DB → check authorization per document → filter unauthorized results before passing to LLM. Problems: unauthorized vectors influenced similarity scoring before the filter ran; at low K, the post-filter result set may be empty; semantic contamination is already present in the ranked list. This pattern is common in early RAG implementations and is insufficient for multi-tenant or regulated environments.',
        },
        {
          label: 'Pattern 2',
          title: 'Pre-Retrieval ID-List Filtering',
          description: 'Fetch the complete list of authorized document IDs from the authorization system → pass the ID list as a filter constraint to the vector DB query → search only within authorized documents. Conceptually correct but operationally fragile: a user with access to 50,000 documents produces a 50,000-ID filter predicate. This destroys vector DB query performance and in some databases exceeds index filter limits entirely. Suitable only for small authorized corpora.',
        },
        {
          label: 'Pattern 3 (Recommended)',
          title: 'Pre-Retrieval via FGA',
          description: 'The authorization system (FGA) produces a structured constraint or filter expression — not a list of IDs — that the vector DB evaluates natively during similarity search. The LLM never sees unauthorized documents because they are excluded from the retrieval result set. Permission changes take effect immediately at query time with no vector re-indexing required. This is the recommended production pattern for enterprise RAG with dynamic permissions.',
        },
        {
          label: 'Pattern 4 (Advanced)',
          title: 'In-Database Authorization',
          description: 'Store vectors, application data, and authorization metadata in the same database (e.g., pgvector + PostgreSQL). Authorization is enforced as a SQL JOIN condition during the similarity query — there is no separate authorization system call. Fastest latency profile because auth and retrieval happen in a single database operation. Requires specific infrastructure (Oso is the primary vendor pursuing this approach as of 2026). Suitable when authorization metadata is stable and the team controls the database layer.',
        },
      ],
      labeledCallouts: [
        {
          label: 'Recommended: Pre-Retrieval via FGA',
          labelColor: 'emerald',
          text: 'Auth0 FGA produces a filter constraint at query time. The vector DB searches within the authorized subset. The LLM context window only ever contains documents the requesting user is allowed to see. Permission changes (user promoted, document reclassified, employment terminated) take effect at the next query — no vector re-indexing required.',
        },
        {
          label: 'Anti-Pattern: Post-Retrieval Filtering',
          labelColor: 'rose',
          text: 'Retrieving first and filtering second allows unauthorized vectors to influence similarity scoring. Even if unauthorized documents are removed before reaching the LLM, their presence in the vector space biased which authorized documents ranked highest. The authorization boundary is at the wrong layer.',
        },
      ],
    },
    {
      heading: 'Auth0 FGA for RAG — How It Works',
      paragraphs: [
        'Auth0 Fine Grained Authorization (FGA) implements Relationship-Based Access Control (ReBAC) built on OpenFGA (CNCF sandbox project). The authorization model defines types and relations: a user can be an owner or viewer of a document. These relationships are stored as tuples — structured facts about who can do what with which resource.',
        'At document ingest time, tuples are written to FGA alongside the vector store write. The two operations are atomic: a document that enters the vector index without a corresponding FGA tuple is inaccessible by default. Ingest-time registration is the enforcement point — not query time, not the application layer.',
        '!! The auth-sync advantage is a direct consequence of querying FGA at retrieval time rather than storing permissions in the vector index. When a user\'s access is revoked — employment terminated, security clearance changed, document reclassified — the FGA tuple is deleted. The next RAG query against that document returns no access. No vector re-indexing required, no cache invalidation, no eventual consistency window. Permission changes are instantaneous at the authorization layer.',
      ],
      conceptGrid: [
        {
          label: 'LangChain Python',
          text: 'GA. FGARetriever wraps any BaseRetriever. Calls FGA BatchCheck for each candidate document before passing results to the LLM chain. Drop-in replacement for any existing LangChain retriever.',
        },
        {
          label: 'LangChain JS/Node.js',
          text: 'GA. Same FGARetriever pattern as Python. Works with LangChain.js and LangGraph.js agent loops. Available via @auth0/ai-langchain npm package.',
        },
        {
          label: 'LlamaIndex JS',
          text: 'GA. FGA authorization integrated into LlamaIndex query pipelines. Available via @auth0/ai-llamaindex npm package. Python support via auth0-ai-llamaindex.',
        },
        {
          label: 'Vercel AI SDK',
          text: 'GA. FGA authorization available in Vercel AI SDK tool and retriever patterns via @auth0/ai-vercel. Highest npm download volume of the Auth0 AI SDK packages as of March 2026.',
        },
      ],
      labeledCallouts: [
        {
          label: 'How FGARetriever Works',
          labelColor: 'blue',
          text: 'FGARetriever wraps any base retriever. At query time: (1) base retriever returns candidate documents via similarity search, (2) FGA BatchCheck API call evaluates each candidate against the requesting user\'s permissions in a single batched request, (3) only documents where the user has the viewer or owner relation are passed to the LLM context. The LLM receives an already-filtered document set — it never processes unauthorized content.',
        },
        {
          label: 'Auth-Sync Advantage',
          labelColor: 'emerald',
          text: 'Because authorization is evaluated at retrieval time against FGA (not stored in the vector index), permission changes take effect immediately. Revoke a user\'s access to a document in FGA and the next query returns nothing for that document — no re-indexing, no cache flush, no delay. This is impossible with metadata-filtering approaches that store permissions in the vector store.',
        },
      ],
    },
    {
      heading: 'Alternative Approaches',
      paragraphs: [
        'Auth0 FGA is not the only authorization mechanism for RAG pipelines. Three alternatives see meaningful adoption in production environments. Each has a distinct tradeoff profile.',
        'AWS S3 Access Grants + Bedrock Knowledge Bases verifies permissions at the data source level: each retrieval call against an S3-backed knowledge base checks that the requesting principal has access to that S3 object via S3 Access Grants. Strong access enforcement at the data layer, but the approach is AWS-only and couples authorization architecture to the S3 infrastructure. Organizations already on AWS with Bedrock Knowledge Bases should evaluate this as a first-party option before introducing a third-party authorization layer.',
        'Permit.io provides a developer-friendly ReBAC and ABAC authorization service with LangChain integrations and a policy-as-code model. Operationally similar to Auth0 FGA for RAG use cases. The key distinction: Permit.io is not an identity provider. It manages authorization policy but requires a separate IdP to establish user identity before authorization decisions can be made. For organizations that already have Auth0 as their IdP, Auth0 FGA is the natural integrated choice. For organizations on other IdPs, Permit.io is a viable standalone option.',
      ],
      labeledCallouts: [
        {
          label: 'Cedar TPE (AWS/Windley)',
          labelColor: 'blue',
          text: 'Cedar Type-Aware Partial Evaluation produces a "policy residual" — a partial evaluation of the Cedar policy that is compiled to a database-native filter expression. The vector DB executes the filter as part of the similarity query. Experimental as of January 2026. Promising for environments already using Cedar as their policy language. Not yet in production tooling for major RAG frameworks.',
        },
        {
          label: 'AWS S3 Access Grants + Bedrock',
          labelColor: 'blue',
          text: 'Enforces permissions at the S3 data source. Each retrieval call verifies the requesting principal\'s S3 access grant before returning the object. First-party AWS enforcement — no external authorization system required. Constraint: AWS-only. Organizations not running their RAG corpus on S3 or not using Bedrock Knowledge Bases cannot use this approach.',
        },
        {
          label: 'Metadata Filtering Limitations',
          labelColor: 'amber',
          text: 'Storing authorization metadata (owner, team, classification) as vector document attributes and filtering at query time is simple to implement but creates an eventual consistency problem. Permission changes require re-indexing every affected document to update the metadata. AWS explicitly states this approach is "insufficient for strong authorization." The lag between a permission change and the re-indexed metadata is an exposure window.',
        },
        {
          label: 'Permit.io',
          labelColor: 'blue',
          text: 'ReBAC and ABAC with LangChain integrations. Developer-friendly policy-as-code model. Not an identity provider — bring your own identity. Viable for organizations not already on Auth0 as their IdP. For Auth0 customers, FGA is the integrated path that avoids introducing a second authorization system.',
        },
      ],
    },
    {
      heading: 'Performance Considerations and Production Guidance',
      paragraphs: [
        'Authorization adds latency to RAG pipelines. The magnitude depends on implementation choices. Most of the latency risk is eliminable by following established patterns rather than building naive authorization loops.',
        'BatchCheck vs. sequential Check: always use the FGA BatchCheck API for evaluating N documents in a single retrieval. Sequential per-document Check calls multiply latency linearly with the number of candidates. A retrieval returning 20 candidate documents with a 5ms FGA round-trip becomes 100ms of authorization latency if checked sequentially, and approximately 5-8ms if batched. This is not a micro-optimization — it is the difference between a usable and an unusable system at scale.',
        'ListObjects vs. post-retrieval BatchCheck: the FGA ListObjects API returns all document IDs a user can access. This works for small authorized sets (under 1,000 documents) and can pre-populate an ID filter for the vector query. At large scale — a user authorized to view 50,000 documents — ListObjects becomes the bottleneck. Pre-retrieval FGA via filter expression (Pattern 3 above) is the correct approach at scale. ListObjects is a useful tool for UI permission checks (showing a user what they can access in a document browser), not for high-throughput retrieval pipelines.',
        'FGA consistency modes: Auth0 FGA supports MINIMIZE_LATENCY (reads from cache, lower latency) and HIGHER_CONSISTENCY (reads from primary store, reflects the most recent permission changes). For RAG pipelines handling sensitive data — financial records, health data, regulated content — use HIGHER_CONSISTENCY. The latency difference is typically under 10ms. The cost of a stale permission read is serving unauthorized content.',
        'Authorization model design: keep FGA authorization models flat for RAG. Deep nesting (document → folder → project → organization → tenant) requires FGA to traverse multiple relationship hops per document check. At N documents per retrieval and H hops per document, authorization latency scales as O(N×H). For RAG pipelines, a direct user-to-document relation (user:alice viewer doc:quarterly-report) is faster than deriving the same permission through a hierarchy.',
      ],
      accordion: [
        {
          title: '1. Register documents in FGA at ingest time',
          content: [
            'Write FGA tuples (user → relation → document) atomically with the vector store write. A document that enters the vector index without a corresponding FGA tuple is unreachable by default — this is the correct safe default.',
            'Never allow a document to enter the retrieval corpus before its authorization tuples are written. The ingest pipeline should fail (not silently succeed) if the FGA write fails.',
          ],
        },
        {
          title: '2. Update FGA immediately on permission changes',
          content: [
            'When a user\'s access to a document changes — access granted, access revoked, document reclassified — update the FGA tuples immediately. Do not defer to a batch sync job.',
            'No vector re-indexing required. The permission change is effective at the next retrieval query. This is the core operational advantage of pre-retrieval FGA over metadata-filtering approaches.',
          ],
        },
        {
          title: '3. Use HIGHER_CONSISTENCY for sensitive queries',
          content: [
            'Configure the FGA client with HIGHER_CONSISTENCY mode for RAG pipelines that retrieve regulated or sensitive content.',
            'MINIMIZE_LATENCY mode reads from cache and may reflect stale permissions for a short window after a permission change. For financial records, health data, and other regulated content, this window is unacceptable. The latency cost of HIGHER_CONSISTENCY is typically under 10ms per BatchCheck call.',
          ],
        },
        {
          title: '4. Monitor BatchCheck latency in your RAG pipeline metrics',
          content: [
            'Instrument your FGA BatchCheck calls as a named span in your tracing infrastructure. Authorization latency is often invisible in aggregate pipeline metrics but becomes the bottleneck when it degrades.',
            'Alert on p99 BatchCheck latency exceeding your retrieval SLA. FGA latency spikes are often early indicators of model complexity issues (deep nesting, large tuple counts per document) that compound at scale.',
          ],
        },
      ],
    },
  ],
};
