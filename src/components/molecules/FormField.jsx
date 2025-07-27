import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ 
  label, 
  error, 
  required, 
  className,
  ...inputProps 
}) => {
  return (
    <div className={className}>
      <Label htmlFor={inputProps.id}>
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </Label>
      <div className="mt-1">
        <Input 
          error={error}
          {...inputProps}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;