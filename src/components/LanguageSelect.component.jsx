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
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="de">German</SelectItem>
          <SelectItem value="zh">Chinese</SelectItem>
          <SelectItem value="ja">Japanese</SelectItem>
          <SelectItem value="ko">Korean</SelectItem>
          <SelectItem value="ar">Arabic</SelectItem>
          <SelectItem value="ru">Russian</SelectItem>
          <SelectItem value="pt">Portuguese</SelectItem>
          <SelectItem value="hi">Hindi</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
