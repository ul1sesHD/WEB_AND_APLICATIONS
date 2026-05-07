// Wrapper de formulario multi-paso
interface WizardProps {
  steps: string[];
  currentStep: number;
  children: React.ReactNode;
}

export function WizardProgress({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '12px 16px 0' }}>
      {steps.map((step, i) => (
        <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div
            style={{
              height: 5,
              borderRadius: 3,
              background: i < currentStep ? '#1A7A4A' : i === currentStep ? '#C0392B' : 'rgba(0,0,0,0.1)',
              transition: 'background 0.3s',
            }}
          />
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 10,
              letterSpacing: '0.06em',
              color: i <= currentStep ? '#3E2723' : '#9e9e9e',
              textAlign: 'center',
            }}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
