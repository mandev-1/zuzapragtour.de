Labelled form control used in the contact / booking forms. Serif body input on a hairline border that darkens to ink on focus.

```jsx
<Field label="Name" name="name" required />
<Field label="Nachricht" name="message" as="textarea" rows={4}
       placeholder="Erzählen Sie mir, was Sie interessiert…" />
```

Props: `label`, `as` (`input` | `textarea`), `type`, `required`, `placeholder`, `rows`, `hint`.
