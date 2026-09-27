import Input from "../Common/Input";

const DeliveryDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Delivery Details</h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter the information required for delivery.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="Enter your name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone Number"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <div className="sm:col-span-2">
          <Input
            label="Address"
            name="address"
            placeholder="House number, street and area"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="City"
          name="city"
          placeholder="Enter city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <Input
          label="State"
          name="state"
          placeholder="Enter state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <Input
          label="Pin Code"
          name="pinCode"
          placeholder="Enter pin code"
          value={formData.pinCode}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default DeliveryDetails;