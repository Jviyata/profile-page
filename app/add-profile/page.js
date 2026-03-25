import AddProfileForm from "@/components/AddProfileForm";

export const metadata = {
  title: "Add Profile",
  description: "Preview the add-profile flow and fields for the Profile App.",
};

export default function AddProfilePage() {
  return (
    <div className="form-page-shell">
      <div className="page-header page-header-compact">
        <h1>Add Profile</h1>
        <p>Create a new team profile and submit it to the API route.</p>
      </div>

      <div className="form-card">
        <AddProfileForm />
      </div>
    </div>
  );
}
