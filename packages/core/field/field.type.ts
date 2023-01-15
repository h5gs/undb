import type { Option } from 'oxide.ts'
import * as z from 'zod'
import type { Options } from '../option/options'
import type { BoolField } from './bool-field'
import type { BoolFieldValue } from './bool-field-value'
import type { IBoolFieldValue } from './bool-field.type'
import {
  boolFieldQuerySchema,
  boolFieldValue,
  boolTypeSchema,
  createBoolFieldSchema,
  createBoolFieldValue,
  createBoolFieldValue_internal,
} from './bool-field.type'
import type { Currency } from './currency'
import type { DateField } from './date-field'
import type { DateFieldValue } from './date-field-value'
import type { IDateFieldValue } from './date-field.type'
import {
  createDateFieldSchema,
  createDateFieldValue,
  createDateFieldValue_internal,
  dateFieldQuerySchema,
  dateFieldValue,
  dateTypeSchema,
} from './date-field.type'
import type { DateRangeField } from './date-range-field'
import type { DateRangeFieldValue } from './date-range-field-value'
import type { IDateRangeFieldValue } from './date-range-field.type'
import {
  createDateRangeFieldSchema,
  createDateRangeFieldValue,
  createDateRangeFieldValue_internal,
  dateRangeFieldQuerySchema,
  dateRangeFieldValue,
  dateRangeTypeSchema,
} from './date-range-field.type'
import { FIELD_TYPE_KEY } from './field.constant'
import type { NumberField } from './number-field'
import type { NumberFieldValue } from './number-field-value'
import type { INumberFieldValue } from './number-field.type'
import {
  createNumberFieldSchema,
  createNumberFieldValue,
  createNumberFieldValue_internal,
  numberFieldQuerySchema,
  numberFieldValue,
  numberTypeSchema,
} from './number-field.type'
import type { ReferenceField } from './reference-field'
import {
  createReferenceFieldSchema,
  createReferenceFieldValue,
  createReferenceFieldValue_internal,
  referenceFieldQuerySchema,
  referenceFieldValue,
  referenceTypeSchema,
} from './reference-field.type'
import type { SelectField } from './select-field'
import type { SelectFieldValue } from './select-field-value'
import type { ISelectFieldValue } from './select-field.type'
import {
  createSelectFieldSchema,
  createSelectFieldValue,
  createSelectFieldValue_internal,
  selectFieldQuerySchema,
  selectFieldValue,
  selectTypeSchema,
} from './select-field.type'
import type { StringField } from './string-field'
import type { StringFieldValue } from './string-field-value'
import type { IStringFieldValue } from './string-field.type'
import {
  createStringFieldSchema,
  createStringFieldValue,
  createStringFieldValue_internal,
  stringFieldQuerySchema,
  stringFieldValue,
  stringTypeSchema,
} from './string-field.type'
import type { FieldId, FieldKey, FieldName, FieldValueConstraints } from './value-objects'
import { fieldNameSchema } from './value-objects/field-name.schema'

export const createFieldSchema = z.discriminatedUnion(FIELD_TYPE_KEY, [
  createStringFieldSchema,
  createNumberFieldSchema,
  createDateFieldSchema,
  createSelectFieldSchema,
  createBoolFieldSchema,
  createDateRangeFieldSchema,
  createReferenceFieldSchema,
])
export type ICreateFieldSchema = z.infer<typeof createFieldSchema>

export const queryFieldSchema = z.discriminatedUnion(FIELD_TYPE_KEY, [
  stringFieldQuerySchema,
  numberFieldQuerySchema,
  dateFieldQuerySchema,
  selectFieldQuerySchema,
  boolFieldQuerySchema,
  dateRangeFieldQuerySchema,
  referenceFieldQuerySchema,
])
export type IQueryFieldSchema = z.infer<typeof queryFieldSchema>
export const querySchemaSchema = z.array(queryFieldSchema)
export type IQuerySchemaSchema = z.infer<typeof querySchemaSchema>

export const fieldTypes = z.union([
  stringTypeSchema,
  numberTypeSchema,
  dateTypeSchema,
  selectTypeSchema,
  boolTypeSchema,
  dateRangeTypeSchema,
  referenceTypeSchema,
])
export type IFieldType = z.infer<typeof fieldTypes>

export const fieldValue = z.union([
  stringFieldValue,
  numberFieldValue,
  dateFieldValue,
  dateRangeFieldValue,
  selectFieldValue,
  boolFieldValue,
  referenceFieldValue,
])
export type IFieldValue = z.infer<typeof fieldValue>

export const createFieldValueSchema = z.union([
  createStringFieldValue,
  createNumberFieldValue,
  createDateFieldValue,
  createDateRangeFieldValue,
  createSelectFieldValue,
  createBoolFieldValue,
  createReferenceFieldValue,
])
export type ICreateFieldValue = z.infer<typeof createFieldValueSchema>

export const createFieldValueObject = z.record(fieldNameSchema, createFieldValueSchema)
export type ICreateFieldValueObject = z.infer<typeof createFieldValueObject>

export const createFieldValueSchema_internal = z.discriminatedUnion(FIELD_TYPE_KEY, [
  createStringFieldValue_internal,
  createNumberFieldValue_internal,
  createDateFieldValue_internal,
  createSelectFieldValue_internal,
  createBoolFieldValue_internal,
  createDateRangeFieldValue_internal,
  createReferenceFieldValue_internal,
])
export type ICreateFieldValueSchema_internal = z.infer<typeof createFieldValueSchema_internal>

export const createFieldsSchema_internal = z.array(createFieldValueSchema_internal)
export type ICreateFieldsSchema_internal = z.infer<typeof createFieldsSchema_internal>

export interface IBaseField {
  id: FieldId
  key: FieldKey
  name: FieldName
  valueConstrains: FieldValueConstraints
}

export type IStringField = IBaseField
export interface INumberField extends IBaseField {
  currency: Option<Currency>
}

export type IDateField = IBaseField
export type IDateRangeField = IBaseField
export type ISelectField = IBaseField & {
  options: Options
}

export type IBoolField = IBaseField
export type IReferenceField = IBaseField

export type Field = StringField | NumberField | DateField | SelectField | BoolField | DateRangeField | ReferenceField

export type FieldValue =
  | StringFieldValue
  | NumberFieldValue
  | DateFieldValue
  | SelectFieldValue
  | BoolFieldValue
  | DateRangeFieldValue
export type FieldValues = FieldValue[]

export type UnpackedFieldValue =
  | IStringFieldValue
  | INumberFieldValue
  | IDateFieldValue
  | ISelectFieldValue
  | IBoolFieldValue
  | IDateRangeFieldValue

export const INTERNAL_COLUMN_ID_NAME = 'id'
export const INTERNAL_COLUMN_CREATED_AT_NAME = 'created_at'
export const INTERNAL_COLUMN_UPDATED_AT_NAME = 'updated_at'

export const internalFieldNames = z.enum([
  INTERNAL_COLUMN_ID_NAME,
  INTERNAL_COLUMN_CREATED_AT_NAME,
  INTERNAL_COLUMN_UPDATED_AT_NAME,
])

export type IInternalFields = z.infer<typeof internalFieldNames>
