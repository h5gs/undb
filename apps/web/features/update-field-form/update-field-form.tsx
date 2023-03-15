import { Button, closeAllModals, Divider, Group, IconPlus, Stack, Switch, TextInput, useDisclosure } from '@egodb/ui'
import { FieldInputLabel } from '../field-inputs/field-input-label'
import { FieldIcon } from '../field-inputs/field-Icon'
import { FieldVariantControl } from '../field/field-variant-control'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import type { DateFieldTypes, IUpdateFieldSchema, ReferenceField, ReferenceFieldTypes, SelectField } from '@egodb/core'
import { updateFieldSchema } from '@egodb/core'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IUpdateFieldProps } from './update-field.props'
import { useUpdateFieldMutation } from '@egodb/store'
import { useCurrentTable } from '../../hooks/use-current-table'
import { useTranslation } from 'react-i18next'

export const UpdateFieldForm: React.FC<IUpdateFieldProps> = ({ field, onCancel }) => {
  const table = useCurrentTable()

  const [display, handler] = useDisclosure()

  const description = field.description?.value
  const defaultValues: IUpdateFieldSchema = {
    type: field.type,
    name: field.name.value,
    description,
    required: field.required,
  }

  if (defaultValues.type === 'reference') {
    defaultValues.foreignTableId = (field as ReferenceField).foreignTableId.into()
  }
  if (defaultValues.type === 'tree' || defaultValues.type === 'parent' || defaultValues.type === 'reference') {
    defaultValues.displayFieldIds = (field as ReferenceFieldTypes).displayFieldIds.map((id) => id.value)
  }
  if (defaultValues.type === 'select') {
    defaultValues.options = (field as SelectField).options.options.map((o) => o.toJSON())
  }

  if (
    defaultValues.type === 'date' ||
    defaultValues.type === 'date-range' ||
    defaultValues.type === 'created-at' ||
    defaultValues.type === 'updated-at'
  ) {
    defaultValues.format = (field as DateFieldTypes).formatString
  }

  const form = useForm<IUpdateFieldSchema>({
    defaultValues,
    resolver: zodResolver(updateFieldSchema),
  })

  const [updateField, { isLoading }] = useUpdateFieldMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    const values: IUpdateFieldSchema = { type: data.type }

    for (const [key, value] of Object.entries(data)) {
      const k = key as keyof IUpdateFieldSchema
      if (k === 'type') continue
      const isDirty = form.getFieldState(k).isDirty
      if (isDirty) {
        values[k] = value
      }
    }

    await updateField({
      tableId: table.id.value,
      fieldId: field.id.value,
      field: values,
    })
    form.reset()
    closeAllModals()
  })

  const { t } = useTranslation()

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Stack>
          <Controller
            name="type"
            control={form.control}
            render={(props) => (
              <TextInput
                {...props.field}
                disabled
                readOnly
                required
                label={<FieldInputLabel>{t('Type', { ns: 'common' })}</FieldInputLabel>}
                icon={<FieldIcon type={form.watch('type')} />}
              />
            )}
          />
          <TextInput
            {...form.register('name')}
            label={<FieldInputLabel>{t('Name', { ns: 'common' })}</FieldInputLabel>}
          />

          {(!!description || display) && (
            <TextInput
              {...form.register('description')}
              autoFocus
              label={<FieldInputLabel>{t('Description', { ns: 'common' })}</FieldInputLabel>}
            />
          )}

          <FieldVariantControl isNew={false} />

          <Divider />

          <Group position="apart">
            <Button
              leftIcon={<IconPlus size={14} />}
              compact
              size="xs"
              variant="white"
              onClick={handler.open}
              sx={{ visibility: description || display ? 'hidden' : 'visible' }}
            >
              {t('Add Description')}
            </Button>

            <Group position="right">
              <Switch
                {...form.register('required')}
                checked={form.watch('required')}
                size="xs"
                label={t('Required', { ns: 'common' })}
              />
              <Button
                compact
                size="xs"
                variant="subtle"
                onClick={() => {
                  onCancel?.()
                  closeAllModals()
                }}
              >
                {t('Cancel', { ns: 'common' })}
              </Button>

              <Button
                compact
                size="xs"
                loading={isLoading}
                disabled={!form.formState.isValid || !form.formState.isDirty}
                type="submit"
              >
                {t('Update', { ns: 'common' })}
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  )
}
