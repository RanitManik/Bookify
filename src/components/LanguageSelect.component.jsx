import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelector({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Spanish">Spanish</SelectItem>
          <SelectItem value="French">French</SelectItem>
          <SelectItem value="German">German</SelectItem>
          <SelectItem value="Chinese">Chinese</SelectItem>
          <SelectItem value="Japanese">Japanese</SelectItem>
          <SelectItem value="ko">Korean</SelectItem>
          <SelectItem value="Korean">Arabic</SelectItem>
          <SelectItem value="Russian">Russian</SelectItem>
          <SelectItem value="Portuguese">Portuguese</SelectItem>
          <SelectItem value="Hindi">Hindi</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
