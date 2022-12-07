<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded" ></new-student-form>
    <student-table v-bind:students="students" 
     v-on:student-arrived-or-left="studentArrivedOrLeft"
     v-on:delete-student="deleteStudent"
     ></student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
    

  </div>
 
</template>

<script>

import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  data () {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  }, 
  mounted() {
    // Load all students - make request to API
   this.updateStudents()
    
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      })
      
      .catch (  () => alert('Unable to fetch student list' ) )
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
      })

      .catch ( err => {
        alert('Error adding student. Star Id must be unique')
      })

      
    },
    studentArrivedOrLeft(student, present) {
      student.present = present // update present value
      this.$student_api.updateStudents(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      })
      .catch( () => alert( ' Unable to update student ' ))
    },

    deleteStudent(student) {
      this.$student_api.deleteStudents(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {} // Clear welcome/GoodBye Message
      })
      .catch( () => alert ('Unable to delete student '))
      }
       
    }
  }

</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

</style>
