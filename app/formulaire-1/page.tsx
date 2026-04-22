import type { Metadata } from 'next';
import QuestionnaireForm from '@/components/QuestionnaireForm';
import { getServerSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Formulaire 1 — AFCAC AST Questionnaire',
  description: 'AFCAC Revised Abuja Safety Targets — State Assessment Questionnaire · Formulaire 1',
};

export default async function Formulaire1Page() {
  const session = await getServerSession();
  const isAdmin = session?.role === 'admin';
  return <QuestionnaireForm formNum={1} isAdmin={isAdmin} />;
}
