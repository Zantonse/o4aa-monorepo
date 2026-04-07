import type { SectionContent } from '../types';
import { content as aiAgents101 } from './ai-agents-101';
import { content as agentIdentity } from './agent-identity';
import { content as mcpProtocol } from './mcp-protocol';
import { content as o4aaProducts } from './o4aa-products';
import { content as mcpAdapter } from './mcp-adapter';
import { content as mcpBridge } from './mcp-bridge';
import { content as oboFlow } from './obo-flow';
import { content as idJag } from './id-jag';
import { content as xaaDeepDive } from './xaa-deep-dive';
import { content as ciba } from './ciba';
import { content as nhiManagement } from './nhi-management';
import { content as integrationGuides } from './integration-guides';
import { content as auditReporting } from './audit-reporting';
import { content as security } from './security';
import { content as compliance } from './compliance';
import { content as demoPlaybook } from './demo-playbook';
import { content as businessOutcomes } from './business-outcomes';
import { content as useCasePatterns } from './use-case-patterns';
import { content as competitive } from './competitive';
import { content as whyOkta } from './why-okta';
import { content as pricing } from './pricing';
import { content as shadowAiDiscovery } from './shadow-ai-discovery';
import { content as credentialSecurity } from './credential-security';
import { content as a2aProtocol } from './a2a-protocol';
import { content as regulatoryFrameworks } from './regulatory-frameworks';
import { content as s2sM2mPatterns } from './s2s-m2m-patterns';
import { content as auth0ForAgents } from './auth0-for-agents';
import { content as messageByPersona } from './message-by-persona';
import { content as customerEvidence } from './customer-evidence';
import { content as glossary } from './glossary';
import { content as managedConnections } from './managed-connections';
import { content as workloadPrincipals } from './workload-principals';
import { content as agentRag } from './agent-rag';
import { content as agentRelay } from './agent-relay';

export const CONTENT_MAP: Record<string, SectionContent> = {
  'ai-agents-101': aiAgents101,
  'agent-identity': agentIdentity,
  'mcp-protocol': mcpProtocol,
  'o4aa-products': o4aaProducts,
  'mcp-adapter': mcpAdapter,
  'mcp-bridge': mcpBridge,
  'obo-flow': oboFlow,
  'id-jag': idJag,
  'xaa-deep-dive': xaaDeepDive,
  'ciba': ciba,
  'nhi-management': nhiManagement,
  'integration-guides': integrationGuides,
  'audit-reporting': auditReporting,
  'security': security,
  'compliance': compliance,
  'demo-playbook': demoPlaybook,
  'business-outcomes': businessOutcomes,
  'use-case-patterns': useCasePatterns,
  'competitive': competitive,
  'shadow-ai-discovery': shadowAiDiscovery,
  'credential-security': credentialSecurity,
  'a2a-protocol': a2aProtocol,
  'regulatory-frameworks': regulatoryFrameworks,
  's2s-m2m-patterns': s2sM2mPatterns,
  'auth0-for-agents': auth0ForAgents,
  'message-by-persona': messageByPersona,
  'customer-evidence': customerEvidence,
  'why-okta': whyOkta,
  'pricing': pricing,
  'glossary': glossary,
  'managed-connections': managedConnections,
  'workload-principals': workloadPrincipals,
  'agent-rag': agentRag,
  'agent-relay': agentRelay,
};
