<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import AppInput from '@/shared/ui/AppInput.vue'
import AppButton from '@/shared/ui/AppButton.vue'

const props = defineProps<{
  existingEmails: string[]
}>()

const emit = defineEmits<{
  (e: 'add-participant', participant: { name: string; dob: string; email: string; phone: string }): void
}>()

const schema = yup.object({
  name: yup.string().required('This value is required.'),
  dob: yup
    .string()
    .required('This value is required.')
    .test('not-in-future', 'Date of birth cannot be in the future.', (val) => !val || new Date(val) <= new Date()),
  email: yup
    .string()
    .required('This value is required.')
    .email('Invalid email format.')
    .test('unique-email', 'Participant with this email already exists.', (val) => {
      if (!val) return true
      return !props.existingEmails.some(email => email.toLowerCase() === val.toLowerCase())
    }),
  phone: yup
    .string()
    .required('This value is required.')
    .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX')
})

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    dob: '',
    email: '',
    phone: ''
  }
})

const { value: name } = useField<string>('name')
const { value: dob } = useField<string>('dob')
const { value: email } = useField<string>('email')
const { value: phone } = useField<string>('phone')

const onSubmit = handleSubmit((values) => {
  emit('add-participant', values)
  resetForm()
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-800 uppercase tracking-wide">Register Form</h2>
      <p class="text-sm text-gray-500">Please fill in all the fields.</p>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <AppInput v-model="name" label="Name" placeholder="Enter user name" :error="errors.name" />
      <AppInput v-model="dob" type="date" label="Date of Birth" :error="errors.dob" />
      <AppInput v-model="email" type="email" label="Email" placeholder="Enter email" :error="errors.email" />
      <AppInput v-model="phone" label="Phone number" placeholder="+380XXXXXXXXX" :error="errors.phone" />

      <div class="flex justify-end pt-2">
        <AppButton type="submit">Save</AppButton>
      </div>
    </form>
  </div>
</template>
