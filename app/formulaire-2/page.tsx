import type { Metadata } from 'next';
import QuestionnaireForm from '@/components/QuestionnaireForm';

export const metadata: Metadata = {
  title: 'Formulaire 2 — AFCAC AST Questionnaire',
  description: 'AFCAC Revised Abuja Safety Targets — State Assessment Questionnaire · Formulaire 2',
};

export default function Formulaire2Page() {
  return <QuestionnaireForm formNum={2} />;
}
