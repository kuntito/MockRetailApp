import {
    FormControl,
    FormLabel,
    HStack,
    Input
} from "@chakra-ui/react";

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const TextInputField = ({ label, value, onChange }: Props) => {
    return (
        <FormControl>
        <HStack gap={0}>
            <FormLabel w={"50px"}>{label}</FormLabel>
            <Input
                w={"200px"}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </HStack>
        </FormControl>
    );
};

export default TextInputField;

