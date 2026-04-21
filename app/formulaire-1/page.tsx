import type { Metadata } from 'next';
import QuestionnaireForm from '@/components/QuestionnaireForm';

export const metadata: Metadata = {
  title: 'Formulaire 1 — AFCAC AST Questionnaire',
  description: 'AFCAC Revised Abuja Safety Targets — State Assessment Questionnaire · Formulaire 1',
};

export default function Formulaire1Page() {
  return <QuestionnaireForm formNum={1} />;
}
