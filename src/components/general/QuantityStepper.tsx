import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
} from "@chakra-ui/react";

interface Props {
    quantity: number;
    setQuantity: (num: number) => void;
}

const QuantityStepper = ({ quantity, setQuantity }: Props) => {
    const onIncrement = () => {
        setQuantity(quantity + 1);
    };
    const onDecrement = () => {
        setQuantity(Math.max(1, quantity - 1));
    };

    return (
        <FormControl
            // border={"2px"}
            width={"fit-content"}
        >
            <InputGroup>
                <InputLeftAddon onClick={onDecrement}>
                    <Button>-</Button>
                </InputLeftAddon>
                <Input
                    type="number"
                    width={"80px"}
                    textAlign={"center"}
                    min={1}
                    value={quantity}
                    onChange={(e) => {
                        const q = parseInt(e.target.value);
                        setQuantity(q);
                    }}
                />
                <InputRightAddon>
                    <Button onClick={onIncrement}>+</Button>
                </InputRightAddon>
            </InputGroup>
        </FormControl>
    );
};

export default QuantityStepper;
