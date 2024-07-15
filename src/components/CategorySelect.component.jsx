import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CategorySelector({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="fiction">Fiction</SelectItem>
          <SelectItem value="non-fiction">Non-Fiction</SelectItem>
          <SelectItem value="sci-fi">Sci-Fi</SelectItem>
          <SelectItem value="mystery">Mystery</SelectItem>
          <SelectItem value="romance">Romance</SelectItem>
          <SelectItem value="self-help">Self-Help</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
