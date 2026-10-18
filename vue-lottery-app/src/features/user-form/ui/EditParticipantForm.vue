<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import AppInput from '@/shared/ui/AppInput.vue'
import AppButton from '@/shared/ui/AppButton.vue'
import type { Participant } from '@/entities/user'

const props = defineProps<{
  participant: Participant
  existingEmails: string[]
}>()

const emit = defineEmits<{
  (e: 'save', updatedParticipant: Participant): void
}>()

const schema = yup.object({
  name: yup.string().required('Required'),
  dob: yup
    .string()
    .required('Required')
    .test('not-in-future', 'Cannot be in future', (val) => !val || new Date(val) <= new Date()),
  email: yup
    .string()
    .required('Required')
    .email('Invalid format')
    .test('unique-email', 'Email already exists', (val) => {
      if (!val) return true
      return !props.existingEmails.some(
        email => email.toLowerCase() === val.toLowerCase() && email.toLowerCase() !== props.participant.email.toLowerCase()
      )
    }),
  phone: yup
    .string()
    .required('Required')
    .matches(/^\+380\d{9}$/, 'Must be +380XXXXXXXXX')
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: props.participant.name,
    dob: props.participant.dob,
    email: props.participant.email,
    phone: props.participant.phone,
  }
})

const { value: name } = useField<string>('name')
const { value: dob } = useField<string>('dob')
const { value: email } = useField<string>('email')
const { value: phone } = useField<string>('phone')

const onSubmit = handleSubmit((values) => {
  emit('save', {
    id: props.participant.id,
    ...values
  })
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <AppInput v-model="name" label="Name" :error="errors.name" />
    <AppInput v-model="dob" type="date" label="Date of Birth" :error="errors.dob" />
    <AppInput v-model="email" type="email" label="Email" :error="errors.email" />
    <AppInput v-model="phone" label="Phone number" :error="errors.phone" />

    <div class="flex justify-end pt-4">
      <AppButton type="submit">Оновити дані</AppButton>
    </div>
  </form>
</template>
