// src/types.ts
import { z } from 'zod';

// =================================================================
// 1. БАЗОВЫЕ ТИПЫ И УТИЛИТЫ (СТРОГИЙ КОНТРАКТ ДАННЫХ)
// =================================================================

/**
 * Единый тип для полей, генерируемых на сервере (ID, время, статус).
 * Все основные сущности CRM наследуются от этого типа.
 * @field id: Идентификатор документа Firestore (string).
 * @field createdAt: Дата создания (Date).
 * @field updatedAt: Дата последнего изменения (Date).
 * @field isArchived: Флаг для "мягкого" удаления (boolean).
 */
export interface ServerGeneratedEntity {
  id: string; 
  createdAt: Date; 
  updatedAt: Date; 
  isArchived: boolean;
}

/**
 * Утилита для API Payload.
 * Исключает поля, генерируемые сервером, из тела запроса.
 */
export type ApiPayload<T extends ServerGeneratedEntity> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>;






// =================================================================
// 2. ПЕРЕЧИСЛЕНИЯ (ENUMS) - СЛОВАРИ И КЛАССИФИКАТОРЫ
// =================================================================

/**
 * Типы повторяющихся записей (для логики календаря).
 * Должен быть объявлен перед RepeatInfo.
 */
export enum RepeatType {
  DoesNotRepeat = 'does-not-repeat',
  RepeatOnRules = 'repeat-on-rules',
  RepeatOnSelectedDays = 'repeat-on-selected-days',
}

export type PetSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export enum ServiceType {
  GROOMING = 'grooming',
  BOARDING = 'BOARDING',
  ADDON = 'add-on',
  EVALUATION = 'evaluation',
}

export enum AppointmentStatus {
  // Статусы до Check-in
  Pending = 'pending',                 // Онлайн-запрос (до одобрения сотрудником)
  Unconfirmed = 'unconfirmed',         // Одобрена, но нет подтверждения от клиента/сотрудника
  Confirmed = 'confirmed',             // Подтверждена (готовность к визиту)
  // Статусы после Check-in
  CheckedIn = 'checked-in',            // Клиент прибыл, услуга в процессе
  ReadyForPickup = 'ready-for-pickup', // Услуга завершена, питомец ждет выдачи
  // Финальные статусы
  CheckedOut = 'checked-out',          // Выдан и (подразумевается) оплачен
  Finished = 'finished',               // Синоним CheckedOut
  Cancelled = 'cancelled',             // Отменен
  NoShow = 'no-show',                  // Неявка
  // Статус "вне цикла"
  Waitlisted = 'waitlisted',           // В списке ожидания (временное хранилище)
}

export enum AppointmentSource {
  Manual = 'manual',
  OnlineBooking = 'online-booking',
  IntakeForm = 'intake-form',
}

export enum InteractionType {
  PHONE = 'Phone Call',
  EMAIL = 'Email',
  IN_PERSON = 'In Person',
}

// =================================================================
// 3. ОСНОВНЫЕ СУЩНОСТИ (INTERFACES)
// =================================================================

/**
 * Клиент (Владелец питомца)
 */
export interface Client extends ServerGeneratedEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
  // Ссылки на питомцев (для масштабируемости используем массив ID)
  petIds: string[]; 
  notes?: string; 
  totalVisits: number;
}

/**
 * Питомец
 */
export interface Pet extends ServerGeneratedEntity {
  clientId: string; // FK
  name: string;
  petType: 'dog' | 'cat';
  petSex: 'male' | 'female';
  breed: string;
  age: number;
  size: PetSize;
  notes: string;
  photos: string[]; // URL из Cloud Storage
  avatarUrl?: string; 
}

/**
 * Услуга (Каталог)
 */
export interface Service extends ServerGeneratedEntity {
  name: string;
  description: string;
  // Цены по размерам
  pricing: Record<PetSize, number>; 
  duration: number; // в минутах
  type: ServiceType;
  applicablePetTypes: ('dog' | 'cat')[];
  taxable: boolean; // Важно для финансового отчета
}

/**
 * Запись (Appointment)
 * Использует Date для работы с календарем (React Big Calendar, MUI X Pickers)
 */
export interface Appointment extends ServerGeneratedEntity {
  clientId: string;
  petIds: string[];
  staffIds: string[]; // Для Multi-staff
  
  // Время всегда как объект Date
  startTime: Date;
  endTime: Date;
  duration: number; 
  
  status: AppointmentStatus;
  source: AppointmentSource;
  
  serviceIds: string[];
  checkInNotes: string;
  ticketComment?: string;
  
  // Фактическое время (для аудита)
  checkInTime?: Date;  
  checkOutTime?: Date; 
  
  // Логика повторения
  repeatInfo?: RepeatInfo; 
}

/**
 * Информация о повторяющейся записи
 */
export interface RepeatInfo {
  type: RepeatType;
  frequency: number; 
  unit: 'days' | 'weeks' | 'months';
  ends?: { 
    onDate?: Date; 
    afterOccurrences?: number; 
  };
}

/**
 * Отчет по визиту (Report)
 */
export interface Report extends ServerGeneratedEntity {
  appointmentId: string;
  notes: string;
  price: number;
  photos: string[];
  // Добавлено поле updatedAt для контроля изменений
}

/**
 * Настройки (Settings) - Предполагается, что это один документ на пользователя
 */
export interface Settings {
  id: string; // Обычно UID пользователя
  colorScheme: string;
  workDayStart: string; // "HH:MM"
  workDayEnd: string; // "HH:MM"
  minTimeSlot: 15 | 30 | 60;
  firstDayOfWeek: 'monday' | 'sunday';
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// =================================================================
// 4. ВСПОМОГАТЕЛЬНЫЕ И СЛОЖНЫЕ ТИПЫ
// =================================================================



/**
 * История взаимодействий (звонки, email)
 */
export interface Interaction extends ServerGeneratedEntity {
  clientId: string;
  date: Date;
  type: InteractionType;
  notes: string;
}