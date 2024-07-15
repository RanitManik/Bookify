import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CountrySelectorComponent({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          <SelectItem value="United States">United States</SelectItem>
          <SelectItem value="Canada">Canada</SelectItem>
          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
          <SelectItem value="Germany">Germany</SelectItem>
          <SelectItem value="France">France</SelectItem>
          <SelectItem value="China">China</SelectItem>
          <SelectItem value="Japan">Japan</SelectItem>
          <SelectItem value="South Korea">South Korea</SelectItem>
          <SelectItem value="India">India</SelectItem>
          <SelectItem value="Australia">Australia</SelectItem>
          <SelectItem value="Brazil">Brazil</SelectItem>
          <SelectItem value="Mexico">Mexico</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
