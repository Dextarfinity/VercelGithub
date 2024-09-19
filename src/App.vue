<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-theme-provider root :dark="isDark">
          <v-container>
            <v-row justify="center" class="ma-5">
              <v-col xs="12" sm="8">
                <v-card>
                  <v-toolbar color="blue darken-4" dark>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="headline">Todo App</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>

                  <v-list two-line subheader>
                    <v-subheader class="headline ml-5">{{ day }}, {{ month }} {{ date }}{{ ord }}, {{ year }}</v-subheader>
                    <p class="mx-12 text-right"><b>{{ todos.length }}</b> Tasks</p>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- Task input -->
                          <v-text-field v-model="newTodo" id="newTodo" name="newTodo" label="Type your task" @keyup.enter="addTodo" :hint="todoExists" persistent-hint />
                        </v-list-item-title>
                        <v-list-item-title>
                          <!-- Category selection -->
                          <v-select
                            v-model="newCategory"
                            :items="categories"
                            label="Select category"
                            persistent-hint
                          />
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-list subheader two-line flat>
                    <v-subheader v-if="todos.length === 0" class="ml-5">You have 0 Tasks, add some</v-subheader>
                    <v-subheader v-else class="ml-5">Your Tasks</v-subheader>

                    <v-list-item-group>
                      <v-list-item v-for="(todo, i) in todos" :key="i">
                        <div class="d-flex align-center justify-space-between" style="width: 100%;">
                          <div class="d-flex align-center">
                            <!-- Checkbox -->
                            <v-list-item-action>
                              <v-checkbox v-model="todo.done" @change="updateEditButtonVisibility"></v-checkbox>
                            </v-list-item-action>

                            <!-- Content (Title, Category, and Subtitle) -->
                            <v-list-item-content>
                              <v-list-item-title :class="{ done: todo.done }">{{ capitalize(todo.title) }} ({{ todo.category }})</v-list-item-title>
                              <v-list-item-subtitle>Added on: {{ month }} {{ date }}{{ ord }}, {{ day }} {{ year }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </div>

                          <!-- Edit Button -->
                          <v-btn v-if="!todo.done" icon small @click="startEditing(todo, i)">
                            <v-icon class="blue--text">mdi-pencil</v-icon>
                          </v-btn>

                          <!-- Remove Button -->
                          <v-btn fab ripple small color="red" v-if="todo.done" @click="removeTodo(i)">
                            <v-icon class="white--text">mdi-close</v-icon>
                          </v-btn>
                        </div>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                  <!-- Edit dialog -->
                  <v-dialog v-model="editDialog" max-width="500">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Edit Task</span>
                      </v-card-title>

                      <v-card-text>
                        <v-text-field v-model="editTodo" label="Edit your task" />
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancelEdit">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="saveEdit">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-theme-provider>
      </v-main>
    </v-app>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isDark: true,
      newTodo: '',
      newCategory: '',
      categories: ['Important', 'Urgent', 'Important and Urgent'],
      todos: [],
      day: this.getDay(),
      month: this.getMonth(),
      date: new Date().getDate(),
      ord: this.getOrdinal(new Date().getDate()),
      year: new Date().getFullYear(),
      editDialog: false,
      editIndex: null,
      editTodo: '',
    };
  },
  computed: {
    todoExists() {
      return this.todos.some(todo => todo.title === this.newTodo) ? "Todo already exists" : "";
    }
  },
  methods: {
    getDay() {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[new Date().getDay()];
    },
    getMonth() {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[new Date().getMonth()];
    },
    getOrdinal(d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
    addTodo() {
      if (this.newTodo && this.newCategory && !this.todos.some(todo => todo.title === this.newTodo)) {
        this.todos.push({ title: this.newTodo, category: this.newCategory, done: false });
        this.newTodo = '';
        this.newCategory = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTheme() {
      this.isDark = !this.isDark;
    },
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    startEditing(todo, index) {
      this.editIndex = index;
      this.editTodo = todo.title;
      this.editDialog = true;
    },
    cancelEdit() {
      this.editDialog = false;
      this.editTodo = '';
    },
    saveEdit() {
      if (this.editTodo.trim() && this.editIndex !== null) {
        this.todos[this.editIndex].title = this.editTodo;
        this.editDialog = false;
        this.editTodo = '';
      }
    },
    updateEditButtonVisibility() {
      // No longer needed, since we're using v-if to control button visibility
    }
  }
};

</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
