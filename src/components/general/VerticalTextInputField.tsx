import { FormLabel, VStack, Text, Input, FormControl } from "@chakra-ui/react";

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
    subLabel?: string;
}

const VerticalTextInputField = ({
    label,
    value,
    onChange,
    subLabel,
}: Props) => {
    return (
        <FormControl>
            <VStack gap={0}>
                <VStack align={"start"} w={"100%"} gap={0}>
                    <FormLabel margin={0} fontWeight={"normal"}>
                        {label}
                    </FormLabel>
                    {subLabel && <Text color={"palette.600"} fontSize={"x-small"}>{subLabel}</Text>}
                </VStack>
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    borderRadius={"full"}
                />
            </VStack>
        </FormControl>
    );
};

export default VerticalTextInputField;
