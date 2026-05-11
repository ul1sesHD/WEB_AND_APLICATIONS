import { RegisterBusinessWizard } from '@/features/business/RegisterBusinessWizard';

export const RegisterBusinessPage = () => (
  <div className="px-4 max-w-2xl mx-auto w-full py-8 flex flex-col gap-6">
    <header>
      <h1 className="font-display text-3xl tracking-wider text-comal">REGISTER A BUSINESS</h1>
      <p className="font-body text-adobe text-sm">Add your business to the neighborhood network.</p>
    </header>
    <RegisterBusinessWizard />
  </div>
);
