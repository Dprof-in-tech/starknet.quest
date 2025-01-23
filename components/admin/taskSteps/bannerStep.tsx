import React, { FunctionComponent } from "react";
import TextInput from "../textInput";

type BannerStepProps = {
  handleTasksInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  step: StepMap;
  index: number;
};

const BannerStep: FunctionComponent<BannerStepProps> = ({
  handleTasksInputChange,
  step,
  index,
}) => {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <TextInput
        onChange={(e) => handleTasksInputChange(e, index)}
        value={step.data.banner.tag}
        name="tag"
        label="Tag"
        placeholder="Optional"
      />
      <TextInput
        onChange={(e) => handleTasksInputChange(e, index)}
        value={step.data.banner.title}
        name="title"
        label="Title"
        placeholder="Title"
      />
      <TextInput
        onChange={(e) => handleTasksInputChange(e, index)}
        value={step.data.banner.description}
        name="description"
        label="Description"
        placeholder="Description"
        multiline={4}
      />
      <TextInput
        onChange={(e) => handleTasksInputChange(e, index)}
        value={step.data.banner.cta}
        name="cta"
        label="CTA (Call to Action)"
        placeholder="Call to Action"
      />
      <TextInput
        onChange={(e) => handleTasksInputChange(e, index)}
        value={step.data.banner.href}
        name="href"
        label="CTA Link"
        placeholder="https://example.com"
      />
      <TextInput
        onChange={(e) => handleTasksInputChange(e, index)}
        value={step.data.banner.image}
        name="image"
        label="Image URL"
        placeholder="/karnot/endurBanner.webp"
      />
    </div>
  );
};

export default BannerStep;
