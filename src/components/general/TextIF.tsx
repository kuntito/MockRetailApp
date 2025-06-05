import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import React from "react";

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const TextIF = ({ label, value, onChange }: InputFieldProps) => {
    return (
        <FormControl>
            <HStack gap={0}>
                <FormLabel w={"50px"} >{label}</FormLabel>
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

export default TextIF;
