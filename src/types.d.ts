type UUID = string;

type timestamp = number;

// [antd:Form]:
type FieldData<FieldNames extends string> = {
  name: FieldNames;
  errors: string[];
};

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
