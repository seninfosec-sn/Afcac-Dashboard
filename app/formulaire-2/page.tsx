import type { Metadata } from 'next';
import QuestionnaireForm from '@/components/QuestionnaireForm';
import { getServerSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Formulaire 2 — AFCAC AST Questionnaire',
  description: 'AFCAC Revised Abuja Safety Targets — State Assessment Questionnaire · Formulaire 2',
};

export default async function Formulaire2Page() {
  const session = await getServerSession();
  const isAdmin = session?.role === 'admin';
  return <QuestionnaireForm formNum={2} isAdmin={isAdmin} />;
}
