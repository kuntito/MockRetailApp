import {
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";

interface TextFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

const CurrencyIF = ({ label, value, onChange }: TextFieldProps) => {
    return (
        <FormControl>
            <HStack>
                <FormLabel flexShrink={0} w={"41px"}>{label}</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents={"none"} children="£" />
                    <Input
                        w={"200px"}
                        pl={7}
                        type="number"
                        value={value > 0 ? value : ""}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            onChange(isNaN(val) ? 0 : val);
                        }}
                    />
                </InputGroup>
            </HStack>
        </FormControl>
    );
};

export default CurrencyIF;
