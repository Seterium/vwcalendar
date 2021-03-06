<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import Calendar from 'v-calendar/lib/components/calendar.umd'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

export default {
  name: 'App',
  components: {
    Calendar
  },
  data: () => ({
    masks: {
      weekdays: 'WWW',
      navMonths: 'MMMM'
    }
  }),
  methods: {
    isWorkingDay(date) {
      const x = dayjs(date, 'YYYY-MM-DD').diff('1970-01-04', 'days') % 4

      return x === 1 || x === 2
    }
  }
}
</script>
<template>
  <div class="app">
    <div class="app__wrap">
      <calendar
        class="app__calendar"
        :masks="masks"
      >
        <template v-slot:day-content="{ day }">
          <div 
            class="app__calendar-day"
            :class="{
              'app__calendar-day--work': isWorkingDay(day.id)
            }"
          >
            <span>{{ day.day }}</span>
          </div>
        </template>
      </calendar>
    </div>
  </div>
</template>
