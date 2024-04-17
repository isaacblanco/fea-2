# PEC 2 - FEA (Front End Avanzado)

Repositorio en GitHub

https://github.com/isaacblanco/fea-2

Me ha dado bastante guerra por lo general.
Estaba trabajando con Angular 17 que no usa el app.module.ts y me confundía.
Así como las dependencias, como el rxjs o el effects que no cargaba bien, a falta de poner el @15 para que todo arrancará. Tampoco esta de mal que fallen estos temas para aprender.

En el ejemplo del todoReduce, tuve que ajustar como gestionar los parametros de entrada con tipados

// export function todoReducer(state, action) {
export function todoReducer(
state: TodoState = initialState,
action: TodoAction
) {
return \_todoReducer(state, action);
}

// Interface for all your Todo actions
interface TodoAction {
type: string; // Replace with specific action types from your actions file
}

Lo que acabo en: (pag 83)

on(getAllTodosError, (state, { payload }) => ({
...state,
loading: false,
loaded: false,
error: payload, // Access error from payload
}))

El payload aún no se usa, y uno se vuelve un poco loco tratando de averiguar porque.
Y es porque aún no se llega a ese punto.
