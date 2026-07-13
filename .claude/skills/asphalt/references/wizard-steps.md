# Wizard and Steps

Wizard components for multi-step flows.

## Basic Wizard

```tsx
import {
  Wizard,
  Step,
  StepContent,
  StepIndicator,
  StepLabel,
  WizardPath,
} from "@asphalt-react/wizard";

function BasicWizard() {
  return (
    <Wizard>
      <Step>
        <StepIndicator>1</StepIndicator>
        <StepContent>
          <StepLabel>User Info</StepLabel>
        </StepContent>
      </Step>
      <WizardPath />
      <Step>
        <StepIndicator>2</StepIndicator>
        <StepContent>
          <StepLabel>Preferences</StepLabel>
        </StepContent>
      </Step>
      <WizardPath />
      <Step>
        <StepIndicator>3</StepIndicator>
        <StepContent>
          <StepLabel>Confirmation</StepLabel>
        </StepContent>
      </Step>
    </Wizard>
  );
}
```

## Wizard with Active States

```tsx
import {
  Wizard,
  Step,
  StepContent,
  StepIndicator,
  StepLabel,
  WizardPath,
} from "@asphalt-react/wizard";

interface WizardWithStatesProps {
  currentStep: number;
}

function WizardWithStates({ currentStep }: WizardWithStatesProps) {
  const steps = [
    { num: 1, label: "Account" },
    { num: 2, label: "Profile" },
    { num: 3, label: "Review" },
  ];

  return (
    <Wizard>
      {steps.map((step, index) => (
        <>
          <Step
            key={step.num}
            completed={currentStep > step.num}
            active={currentStep === step.num}
          >
            <StepIndicator>{step.num}</StepIndicator>
            <StepContent>
              <StepLabel>{step.label}</StepLabel>
            </StepContent>
          </Step>
          {index < steps.length - 1 && <WizardPath />}
        </>
      ))}
    </Wizard>
  );
}
```

## Multi-Step Form with Wizard

```tsx
import React, { useState } from "react";
import {
  Wizard,
  Step,
  StepContent,
  StepIndicator,
  StepLabel,
  WizardPath,
} from "@asphalt-react/wizard";
import { Layout } from "@asphalt-react/layout";
import { Button } from "@asphalt-react/button";
import { Textfield, Email } from "@asphalt-react/textfield";
import { Heading, Text } from "@asphalt-react/typography";
import { Card } from "@asphalt-react/card";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
}

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
  });

  const steps = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Work Details" },
    { num: 3, label: "Review" },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <Layout vertical gap="l">
      <Wizard>
        {steps.map((step, index) => (
          <React.Fragment key={step.num}>
            <Step
              completed={currentStep > step.num}
              active={currentStep === step.num}
            >
              <StepIndicator>{step.num}</StepIndicator>
              <StepContent>
                <StepLabel>{step.label}</StepLabel>
              </StepContent>
            </Step>
            {index < steps.length - 1 && <WizardPath />}
          </React.Fragment>
        ))}
      </Wizard>

      <Card>
        {currentStep === 1 && (
          <Layout vertical gap="m">
            <Heading h4>Personal Information</Heading>
            <Textfield
              stretch
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Email
              stretch
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Layout>
        )}

        {currentStep === 2 && (
          <Layout vertical gap="m">
            <Heading h4>Work Details</Heading>
            <Textfield
              stretch
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
            <Textfield
              stretch
              placeholder="Job Title"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </Layout>
        )}

        {currentStep === 3 && (
          <Layout vertical gap="m">
            <Heading h4>Review Your Information</Heading>
            <Layout spread>
              <Text muted>Name:</Text>
              <Text>{formData.name}</Text>
            </Layout>
            <Layout spread>
              <Text muted>Email:</Text>
              <Text>{formData.email}</Text>
            </Layout>
            <Layout spread>
              <Text muted>Company:</Text>
              <Text>{formData.company}</Text>
            </Layout>
            <Layout spread>
              <Text muted>Role:</Text>
              <Text>{formData.role}</Text>
            </Layout>
          </Layout>
        )}
      </Card>

      <Layout spread>
        <Button secondary onClick={handleBack} disabled={currentStep === 1}>
          Back
        </Button>
        {currentStep < 3 ? (
          <Button primary onClick={handleNext}>
            Continue
          </Button>
        ) : (
          <Button primary onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Layout>
    </Layout>
  );
}
```

## Checkout Wizard

```tsx
import React, { useState } from "react";
import {
  Wizard,
  Step,
  StepContent,
  StepIndicator,
  StepLabel,
  StepDescription,
  WizardPath,
} from "@asphalt-react/wizard";
import { Layout } from "@asphalt-react/layout";
import { Check } from "@asphalt-react/iconpack";

function CheckoutWizard() {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    { num: 1, label: "Cart", description: "Review items" },
    { num: 2, label: "Shipping", description: "Delivery address" },
    { num: 3, label: "Payment", description: "Payment method" },
    { num: 4, label: "Confirm", description: "Place order" },
  ];

  return (
    <Wizard>
      {steps.map((step, index) => (
        <React.Fragment key={step.num}>
          <Step
            completed={currentStep > step.num}
            active={currentStep === step.num}
          >
            <StepIndicator>
              {currentStep > step.num ? <Check /> : step.num}
            </StepIndicator>
            <StepContent>
              <StepLabel>{step.label}</StepLabel>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
          </Step>
          {index < steps.length - 1 && <WizardPath />}
        </React.Fragment>
      ))}
    </Wizard>
  );
}
```

## Vertical Wizard

```tsx
import {
  Wizard,
  Step,
  StepContent,
  StepIndicator,
  StepLabel,
  WizardPath,
} from "@asphalt-react/wizard";

function VerticalWizard() {
  return (
    <Wizard vertical>
      <Step completed>
        <StepIndicator>1</StepIndicator>
        <StepContent>
          <StepLabel>Step 1 - Completed</StepLabel>
        </StepContent>
      </Step>
      <WizardPath />
      <Step active>
        <StepIndicator>2</StepIndicator>
        <StepContent>
          <StepLabel>Step 2 - In Progress</StepLabel>
        </StepContent>
      </Step>
      <WizardPath />
      <Step>
        <StepIndicator>3</StepIndicator>
        <StepContent>
          <StepLabel>Step 3 - Upcoming</StepLabel>
        </StepContent>
      </Step>
    </Wizard>
  );
}
```

## Wizard with Custom Icons

```tsx
import {
  Wizard,
  Step,
  StepContent,
  StepIndicator,
  StepLabel,
  WizardPath,
} from "@asphalt-react/wizard";
import { User, CreditCard, Check, Package } from "@asphalt-react/iconpack";

function IconWizard() {
  return (
    <Wizard>
      <Step completed>
        <StepIndicator>
          <User />
        </StepIndicator>
        <StepContent>
          <StepLabel>Account</StepLabel>
        </StepContent>
      </Step>
      <WizardPath />
      <Step active>
        <StepIndicator>
          <CreditCard />
        </StepIndicator>
        <StepContent>
          <StepLabel>Payment</StepLabel>
        </StepContent>
      </Step>
      <WizardPath />
      <Step>
        <StepIndicator>
          <Package />
        </StepIndicator>
        <StepContent>
          <StepLabel>Shipping</StepLabel>
        </StepContent>
      </Step>
      <WizardPath />
      <Step>
        <StepIndicator>
          <Check />
        </StepIndicator>
        <StepContent>
          <StepLabel>Done</StepLabel>
        </StepContent>
      </Step>
    </Wizard>
  );
}
```

## Onboarding Flow

```tsx
import React, { useState } from "react";
import {
  Wizard,
  Step,
  StepContent,
  StepIndicator,
  StepLabel,
  WizardPath,
} from "@asphalt-react/wizard";
import { Layout } from "@asphalt-react/layout";
import { Card } from "@asphalt-react/card";
import { Button } from "@asphalt-react/button";
import { Heading, Text } from "@asphalt-react/typography";
import { ProgressBar } from "@asphalt-react/progress-bar";

function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    { num: 1, label: "Welcome", content: "Welcome to our platform!" },
    { num: 2, label: "Profile", content: "Set up your profile" },
    { num: 3, label: "Preferences", content: "Customize your experience" },
    { num: 4, label: "Complete", content: "You're all set!" },
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Layout vertical gap="l">
      <ProgressBar value={progress} />

      <Wizard>
        {steps.map((step, index) => (
          <React.Fragment key={step.num}>
            <Step
              completed={currentStep > step.num}
              active={currentStep === step.num}
            >
              <StepIndicator>{step.num}</StepIndicator>
              <StepContent>
                <StepLabel>{step.label}</StepLabel>
              </StepContent>
            </Step>
            {index < steps.length - 1 && <WizardPath />}
          </React.Fragment>
        ))}
      </Wizard>

      <Card>
        <Layout vertical gap="m">
          <Heading h3>{steps[currentStep - 1].label}</Heading>
          <Text>{steps[currentStep - 1].content}</Text>
        </Layout>
      </Card>

      <Layout spread>
        <Button
          tertiary
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button
          primary
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
        >
          {currentStep === totalSteps ? "Finish" : "Continue"}
        </Button>
      </Layout>
    </Layout>
  );
}
```

## Wizard Hook Pattern

```tsx
import React, { useState, useCallback } from "react";

interface UseWizardProps {
  totalSteps: number;
  initialStep?: number;
}

function useWizard({ totalSteps, initialStep = 1 }: UseWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps],
  );

  const nextStep = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const progress = (currentStep / totalSteps) * 100;

  return {
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    progress,
    totalSteps,
  };
}

function WizardWithHook() {
  const { currentStep, nextStep, prevStep, isFirstStep, isLastStep, progress } =
    useWizard({ totalSteps: 3 });

  return (
    <Layout vertical gap="m">
      <ProgressBar value={progress} />
      <Text>Step {currentStep} of 3</Text>
      <Layout spread>
        <Button secondary onClick={prevStep} disabled={isFirstStep}>
          Back
        </Button>
        <Button primary onClick={nextStep} disabled={isLastStep}>
          {isLastStep ? "Complete" : "Next"}
        </Button>
      </Layout>
    </Layout>
  );
}
```

## Props Reference

### Wizard Props

| Prop     | Type | Default | Description          |
| -------- | ---- | ------- | -------------------- |
| children | node | -       | Wizard steps         |
| vertical | bool | false   | Vertical orientation |

### Step Props

| Prop      | Type | Default | Description       |
| --------- | ---- | ------- | ----------------- |
| completed | bool | false   | Step is completed |
| active    | bool | false   | Step is current   |
| children  | node | -       | Step content      |

### StepIndicator Props

| Prop     | Type | Default | Description    |
| -------- | ---- | ------- | -------------- |
| children | node | -       | Number or icon |

### StepLabel Props

| Prop     | Type | Default | Description     |
| -------- | ---- | ------- | --------------- |
| children | node | -       | Step label text |

### StepDescription Props

| Prop     | Type | Default | Description           |
| -------- | ---- | ------- | --------------------- |
| children | node | -       | Step description text |
