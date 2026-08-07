import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
  useFieldContext,
  Wrap,
  CloseButton,
  Badge,
  Text,
} from "@chakra-ui/react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form"

type ValueType = {
  label: string
  value: string
}
import { useEffect, useState } from "react";
type CustomComboboxProps<T extends FieldValues = FieldValues> = {
  values: ValueType[]
  name: Path<T>
  control: Control<T>
  rules?: RegisterOptions<T>
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  onValueChange?: (val: string[]) => void
}

const CustomCombobox = <T extends FieldValues>({
  values,
  name,
  control,
  rules,
  multiple = false,
  disabled = false,
  // placeholder = "Type to search",
  onValueChange,
}: CustomComboboxProps<T>) => {
  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter, set } = useListCollection<ValueType>({
    initialItems: values,
    filter: contains,
  })
  const fieldContext = useFieldContext()
  const isInvalid = fieldContext?.invalid ?? false
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (values.length > 0) set(values)
  }, [values, set])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const selectedValues: string[] = Array.isArray(field.value)
          ? field.value
          : field.value
            ? [field.value]
            : []

        // Keep the displayed input text in sync with field.value, no matter
        // how it changed (user click, defaultValues, reset(), setValue()...).
        // useEffect(() => {
        //   if (selectedValues.length === 0) {
        //     setSearchValue("")
        //   } else if (selectedValues.length === 1) {
        //     setSearchValue(
        //       values.find((i) => i.value === selectedValues[0])?.label ?? ""
        //     )
        //   } else {
        //     setSearchValue(`${selectedValues.length} selected`)
        //   }
        //   // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [JSON.stringify(selectedValues), values])
        // console.log(selectedValues);

        return (
          <Combobox.Root
            collection={collection}
            value={selectedValues}
            inputValue={searchValue}
            width="100%"
            openOnClick
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            multiple={multiple}
            disabled={disabled}
            invalid={isInvalid}
            flexDirection={'column'}
            display={'flex'}
            onInputValueChange={(e) => {
              // Chakra/Ark also calls this right after a selection or clear,
              // to resync its own internal input state. If we don't filter
              // that out, it overwrites the label we just set above with "".
              // Only real user typing should update the search/filter state.
              if (e.reason !== "input-change") return

              setSearchValue(e.inputValue)

              if (e.inputValue.trim() === "") {
                set(values)
              } else {
                filter(e.inputValue)
              }
            }}
            onValueChange={(e) => {
              const nextValue = multiple ? e.value : e.value[0] ?? ""
              field.onChange(nextValue)
              onValueChange?.(e.value)
            }}
          >



            <Combobox.Control
              minH="48px"
              border="1px solid #1C1B1A"
              borderRadius="30px"
              display="flex"
              alignItems="center"
              onClick={() => setOpen(true)}
              px={4}
            >
              {/* <Combobox.Input
                outline={'none'}
                placeholder={placeholder}
                border={'none'}
                px={5}
                fontSize="13px"
                color="#1E1E1E"
                _placeholder={{
                  color: "#666666",
                }}
                h={{
                  base: "45px",
                  md: "48px",
                }}
              /> */}
              {selectedValues?.length === 0 && (

                <Text

                  // my={'auto'}
                  fontSize="13px"
                  color="#777777"
                  _placeholder={{
                    color: "#777777",
                  }}
                  pl={'20px'}
                >
                  Select your Requirement(s)
                </Text>
              )
              }
              {multiple && selectedValues.length > 0 && (
                <Wrap
                  gap="2"
                  flex="1"
                  pe="40px"
                  py={2}
                >
                  {selectedValues.map((value) => {
                    const selected = values.find((v) => v.value === value);

                    return (
                      <Badge
                        key={value}
                        borderRadius="full"
                        px={3}
                        py={1}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        bgColor={'#e5e5e5 '}
                      >
                        {selected?.label}

                        <CloseButton
                          bgColor={'#e5e5e5 '}
                          size="2xs"
                          onClick={(e) => {
                            e.stopPropagation();

                            field.onChange(
                              selectedValues.filter((v) => v !== value)
                            );
                          }}
                        />
                      </Badge>
                    );
                  })}
                </Wrap>
              )}
              <Combobox.IndicatorGroup ml="auto" flexShrink={0} >
                {/* {selectedValues.length > 0 && (
                  <Combobox.ClearTrigger
                    onClick={() => {
                      field.onChange(multiple ? [] : "")
                      setSearchValue("")
                      set(values)
                    }}
                  />
                )} */}

                <Combobox.Trigger top={selectedValues.length === 0 ? '15px' : '21px'} right={'20px'} position={'absolute'} />
              </Combobox.IndicatorGroup>
            </Combobox.Control>
            {/* {multiple && selectedValues.length > 0 && (
              <Wrap gap="2" mb={2}>
                {selectedValues.map((value) => {
                  const selected = values.find((v) => v.value === value)

                  return (
                    <Badge
                      key={value}
                      borderRadius="full"
                      px={3}
                      py={1}
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      {selected?.label}

                      <CloseButton
                        size="2xs"
                        onClick={(e) => {
                          e.stopPropagation()

                          field.onChange(
                            selectedValues.filter((v) => v !== value)
                          )
                        }}
                      />
                    </Badge>
                  )
                })}
              </Wrap>
            )} */}
            <Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.Empty>No items found</Combobox.Empty>
                  {collection.items.map((item) => (
                    <Combobox.Item item={item} key={item.value}>
                      {item.label}
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>
            </Portal>
          </Combobox.Root>
        )
      }}
    />
  )
}

export default CustomCombobox
