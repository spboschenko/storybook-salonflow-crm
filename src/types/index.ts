// src/types/index.ts
import { z } from 'zod';

// =================================================================
// 1. БАЗОВЫЕ УТИЛИТЫ И ENUMS
// =================================================================

/**
 * Утилита для API Payload - исключает серверные поля
 */
export type ApiPayload<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

// Размеры питомцев
export const PetSizeSchema = z.enum(['XS', 'S', 'M', 'L', 'XL']);
export type PetSize = z.infer<typeof PetSizeSchema>;

// Типы услуг
export const ServiceTypeSchema = z.enum(['grooming', 'boarding', 'add-on', 'evaluation']);
export type ServiceType = z.infer<typeof ServiceTypeSchema>;

// Унифицированные статусы записей (объединяем оба подхода)
export const AppointmentStatusSchema = z.enum([
  // Статусы до Check-in
  'pending',                 // Онлайн-запрос (до одобрения сотрудником)
  'unconfirmed',            // Одобрена, но нет подтверждения
  'confirmed',              // Подтверждена (готовность к визиту)
  'scheduled',              // Синоним confirmed
  // Статусы после Check-in
  'checked-in',             // Клиент прибыл, услуга в процессе
  'in-progress',            // Синоним checked-in
  'ready-for-pickup',       // Услуга завершена, питомец ждет выдачи
  // Финальные статусы
  'checked-out',            // Выдан и оплачен
  'completed',              // Синоним checked-out
  'finished',               // Синоним checked-out
  'cancelled',              // Отменен
  'no-show',                // Неявка
  // Статус "вне цикла"
  'waitlisted',             // В списке ожидания
]);
export type AppointmentStatus = z.infer<typeof AppointmentStatusSchema>;

// Приоритет записей
export const AppointmentPrioritySchema = z.enum(['low', 'normal', 'high', 'urgent']);
export type AppointmentPriority = z.infer<typeof AppointmentPrioritySchema>;

// Источники записей
export const AppointmentSourceSchema = z.enum(['manual', 'online-booking', 'intake-form']);
export type AppointmentSource = z.infer<typeof AppointmentSourceSchema>;

// Типы повторения
export const RepeatTypeSchema = z.enum(['does-not-repeat', 'repeat-on-rules', 'repeat-on-selected-days']);
export type RepeatType = z.infer<typeof RepeatTypeSchema>;

// Виды календаря
export const CalendarViewSchema = z.enum(['day', 'week', 'month', 'agenda']);
export type CalendarView = z.infer<typeof CalendarViewSchema>;

// =================================================================
// 2. ОСНОВНЫЕ СУЩНОСТИ (ZOD SCHEMAS)
// =================================================================

/**
 * Клиент (Владелец питомца)
 */
export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  petIds: z.array(z.string()).default([]),
  notes: z.string().optional(),
  totalVisits: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Client = z.infer<typeof ClientSchema>;

/**
 * Питомец
 */
export const PetSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  name: z.string(),
  petType: z.enum(['dog', 'cat']),
  petSex: z.enum(['male', 'female']).optional(),
  breed: z.string().optional(),
  species: z.enum(['dog', 'cat', 'other']).optional(), // для совместимости
  age: z.number().optional(),
  size: PetSizeSchema.optional(),
  weight: z.number().optional(),
  color: z.string().optional(),
  notes: z.string().optional(),
  specialNotes: z.string().optional(),
  medicalNotes: z.string().optional(),
  aggressiveness: z.enum(['calm', 'nervous', 'aggressive']).optional(),
  photos: z.array(z.string()).default([]),
  avatarUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Pet = z.infer<typeof PetSchema>;

/**
 * Услуга
 */
export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  // Цены по размерам (новый подход)
  pricing: z.record(PetSizeSchema, z.number()).optional(),
  // Единая цена (старый подход для совместимости)
  price: z.number().optional(),
  duration: z.number(), // в минутах
  type: ServiceTypeSchema.optional(),
  category: z.string().optional(),
  applicablePetTypes: z.array(z.enum(['dog', 'cat'])).optional(),
  taxable: z.boolean().default(true),
  isActive: z.boolean().default(true),
  color: z.string().optional(), // для календаря
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Service = z.infer<typeof ServiceSchema>;

/**
 * Сотрудник
 */
export const EmployeeSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  isActive: z.boolean().default(true),
  workingHours: z.object({
    monday: z.object({ start: z.string(), end: z.string() }).optional(),
    tuesday: z.object({ start: z.string(), end: z.string() }).optional(),
    wednesday: z.object({ start: z.string(), end: z.string() }).optional(),
    thursday: z.object({ start: z.string(), end: z.string() }).optional(),
    friday: z.object({ start: z.string(), end: z.string() }).optional(),
    saturday: z.object({ start: z.string(), end: z.string() }).optional(),
    sunday: z.object({ start: z.string(), end: z.string() }).optional(),
  }),
  color: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Employee = z.infer<typeof EmployeeSchema>;

/**
 * Информация о повторении
 */
export const RepeatInfoSchema = z.object({
  type: RepeatTypeSchema,
  frequency: z.number().default(1),
  unit: z.enum(['days', 'weeks', 'months']),
  ends: z.object({
    onDate: z.date().optional(),
    afterOccurrences: z.number().optional(),
  }).optional(),
});
export type RepeatInfo = z.infer<typeof RepeatInfoSchema>;

/**
 * Запись/Визит
 */
export const AppointmentSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  petId: z.string().optional(), // для совместимости с единичными записями
  petIds: z.array(z.string()).default([]), // новый подход для множественных питомцев
  employeeId: z.string().optional(), // для совместимости
  staffIds: z.array(z.string()).default([]), // новый подход для множественного персонала
  serviceId: z.string().optional(), // для совместимости
  serviceIds: z.array(z.string()).default([]), // новый подход для множественных услуг
  
  // Время
  startTime: z.date(),
  endTime: z.date(),
  duration: z.number(),
  
  // Статусы и метаданные
  status: AppointmentStatusSchema,
  priority: AppointmentPrioritySchema.default('normal'),
  source: AppointmentSourceSchema.default('manual'),
  
  // Заметки
  notes: z.string().optional(),
  checkInNotes: z.string().optional(),
  internalNotes: z.string().optional(),
  ticketComment: z.string().optional(),
  
  // Финансы
  price: z.number().optional(),
  discount: z.number().optional(),
  
  // Мобильный груминг
  travelTime: z.number().optional(),
  address: z.string().optional(),
  
  // Временные метки
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
  reminderSent: z.boolean().default(false),
  
  // Повторение
  repeatInfo: RepeatInfoSchema.optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Appointment = z.infer<typeof AppointmentSchema>;

/**
 * Расширенная запись с связанными данными
 */
export const AppointmentWithRelationsSchema = AppointmentSchema.extend({
  client: ClientSchema,
  pets: z.array(PetSchema).optional(),
  employees: z.array(EmployeeSchema).optional(),
  services: z.array(ServiceSchema).optional(),
  // Для совместимости со старым API
  pet: PetSchema.optional(),
  employee: EmployeeSchema.optional(),
  service: ServiceSchema.optional(),
});
export type AppointmentWithRelations = z.infer<typeof AppointmentWithRelationsSchema>;

/**
 * Отчет
 */
export const ReportSchema = z.object({
  id: z.string(),
  appointmentId: z.string(),
  notes: z.string(),
  price: z.number(),
  photos: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Report = z.infer<typeof ReportSchema>;

/**
 * Взаимодействие
 */
export const InteractionTypeSchema = z.enum(['Phone Call', 'Email', 'In Person']);
export type InteractionType = z.infer<typeof InteractionTypeSchema>;

export const InteractionSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  date: z.date(),
  type: InteractionTypeSchema,
  notes: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Interaction = z.infer<typeof InteractionSchema>;

// =================================================================
// 3. КАЛЕНДАРНЫЕ ТИПЫ
// =================================================================

export const TimeSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  isWorkingHour: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
});
export type TimeSlot = z.infer<typeof TimeSlotSchema>;

export const CalendarDaySchema = z.object({
  date: z.date(),
  isToday: z.boolean(),
  isWorkingDay: z.boolean(),
  appointments: z.array(AppointmentWithRelationsSchema),
  appointmentCount: z.number(),
});
export type CalendarDay = z.infer<typeof CalendarDaySchema>;

export const CalendarSizeSchema = z.enum(['compact', 'standard', 'comfortable']);
export type CalendarSize = z.infer<typeof CalendarSizeSchema>;

export const CalendarSettingsSchema = z.object({
  defaultView: CalendarViewSchema.default('week'),
  timeSlotDuration: z.number().default(15),
  workDayStart: z.string().default('09:00'),
  workDayEnd: z.string().default('18:00'),
  weekStartsOn: z.number().min(0).max(6).default(1),
  showWeekends: z.boolean().default(true),
  showTravelTime: z.boolean().default(false),
  compactMode: z.boolean().default(false),
  dateFormat: z.string().default('DD.MM.YYYY'),
  timeFormat: z.enum(['12h', '24h']).default('24h'),
});
export type CalendarSettings = z.infer<typeof CalendarSettingsSchema>;

/**
 * Настройки системы
 */
export const SettingsSchema = z.object({
  id: z.string(),
  colorScheme: z.string(),
  workDayStart: z.string(),
  workDayEnd: z.string(),
  minTimeSlot: z.union([z.literal(15), z.literal(30), z.literal(60)]).default(15),
  firstDayOfWeek: z.enum(['monday', 'sunday']).default('monday'),
  currency: z.string().default('USD'),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Settings = z.infer<typeof SettingsSchema>;

// =================================================================
// 4. API PAYLOAD TYPES
// =================================================================

export type ClientPayload = ApiPayload<Client>;
export type PetPayload = ApiPayload<Pet>;
export type ServicePayload = ApiPayload<Service>;
export type EmployeePayload = ApiPayload<Employee>;
export type AppointmentPayload = ApiPayload<Appointment>;
export type ReportPayload = ApiPayload<Report>;
export type InteractionPayload = ApiPayload<Interaction>;
export type SettingsPayload = ApiPayload<Settings>;