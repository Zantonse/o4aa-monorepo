import type { Metadata } from 'next';
import QuestionBankPage from '@/components/QuestionBankPage';

export const metadata: Metadata = {
  title: 'Question Bank | O4AA Discovery Planner',
  description: 'CoTM framework discovery questions by use case',
};

export default function QuestionsRoute() {
  return <QuestionBankPage />;
}
