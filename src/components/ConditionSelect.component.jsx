import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ConditionSelector({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Conditions</SelectLabel>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="like-new">Like New</SelectItem>
          <SelectItem value="used">Used</SelectItem>
          <SelectItem value="fair">Fair</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
