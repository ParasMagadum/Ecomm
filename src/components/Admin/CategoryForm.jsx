import { useEffect, useState } from "react";
import Button from "../Common/Button";

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  useEffect(() => setForm(category ? { name: category.name, description: category.description || "" } : { name: "", description: "" }), [category]);
  const submit = (event) => { event.preventDefault(); onSubmit(form); };
  return <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5" /></label><label className="text-sm font-medium text-slate-700">Description<input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5" /></label></div><div className="mt-4 flex gap-3"><Button type="submit">{category ? "Update category" : "Add category"}</Button>{onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}</div></form>;
};

export default CategoryForm;