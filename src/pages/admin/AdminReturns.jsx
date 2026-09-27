import { useEffect, useState } from "react";
import {
  getReturns,
  approveReturn,
  rejectReturn
} from "../../api/admin";

const AdminReturns = () => {
  const [returns, setReturns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadReturns = async () => {
    try {
      setLoading(true);

      const data = await getReturns();

      setReturns(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load return requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReturns();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveReturn(id);

      setReturns(
        returns.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "Approved"
              }
            : item
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to approve return"
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectReturn(id);

      setReturns(
        returns.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "Rejected"
              }
            : item
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reject return"
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Return Requests
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review customer return requests.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading return requests...
          </div>
        ) : returns.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            No return requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Reason
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {returns.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b last:border-0"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">
                        {item.user?.name || "Unknown"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.user?.email || ""}
                      </p>
                    </td>

                    <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                      {item.reason}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {item.status === "Pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleApprove(item._id)
                            }
                            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(item._id)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReturns;