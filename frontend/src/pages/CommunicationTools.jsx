import React, { useEffect, useState } from "react";
import {
  fetchTemplates,
  createTemplate as saveTemplate,
  fetchTriggers,
  saveTrigger,
  fetchNotifications,
  saveNotification
} from "../utils/api";

export default function CommunicationTools() {
  const [activeTab, setActiveTab] = useState("templates");

  const [templates, setTemplates] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [showTriggerForm, setShowTriggerForm] = useState(false);
  const [newTrigger, setNewTrigger] = useState({
    name: "",
    event: "",
    deliveryMethods: [],
    template: ""
  });

  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    event: "",
    audience: "",
    channels: [],
    template: "",
    message: ""
  });

  useEffect(() => {
  async function loadData() {
    try {
      const [t, tr, n] = await Promise.all([
  fetchTemplates(),
  fetchTriggers(),
  fetchNotifications()
]);
console.log("Fetched Triggers", tr); // ✅ Debug log
      setTemplates(t);
      setTriggers(tr);
      setNotifications(n);
    } catch (err) {
      console.error("Error loading data", err);
    }
  }
  loadData();
}, []);


  // Template Handlers
  const addTemplate = async () => {
    const newOne = {
      title: `New Template ${templates.length + 1}`,
      subject: "Subject",
      content: "Content..."
    };
    const saved = await saveTemplate(newOne);
    setTemplates([...templates, saved]);
  };

  const deleteTemplate = (idx) =>
    setTemplates(templates.filter((_, i) => i !== idx));

  const editTemplate = (idx) => {
    const updated = [...templates];
    const title = prompt("Edit Title", updated[idx].title);
    const subject = prompt("Edit Subject", updated[idx].subject);
    const content = prompt("Edit Content", updated[idx].content);
    if (title && subject && content) {
      updated[idx] = { title, subject, content };
      setTemplates(updated);
    }
  };

  const handleUseTemplate = (template) => {
    setActiveTab("triggers");
    setShowTriggerForm(true);
    setNewTrigger({
      name: "",
      event: "",
      deliveryMethods: [],
      template: template.title
    });
  };

  // Trigger Handlers
  const handleDeliveryToggle = (method) => {
    setNewTrigger((prev) => ({
      ...prev,
      deliveryMethods: prev.deliveryMethods.includes(method)
        ? prev.deliveryMethods.filter((m) => m !== method)
        : [...prev.deliveryMethods, method]
    }));
  };

  const handleSaveTrigger = async () => {
  if (!newTrigger.name || !newTrigger.event || !newTrigger.template) {
    alert("Please fill all required fields");
    return;
  }

  const payload = {
  name: newTrigger.name,
  event: newTrigger.event,
  deliveryMethods: newTrigger.deliveryMethods.join(","), // ✅ correct key
  template: newTrigger.template,
  status: "Active",
  active: true,
  lastSent: new Date().toISOString()
};



  try {
    const saved = await saveTrigger(payload);
    setTriggers([...triggers, saved]);
    setShowTriggerForm(false);
    setNewTrigger({ name: "", event: "", deliveryMethods: [], template: "" });
  } catch (error) {
    console.error("❌ Failed to save trigger:", error);
    alert("Failed to save trigger. Check server logs and request format.");
  }
};


  const toggleTriggerStatus = (index) => {
    const updated = [...triggers];
    updated[index].status =
      updated[index].status === "Active" ? "Inactive" : "Active";
    setTriggers(updated);
  };

  // Notification Handlers
  const handleChannelToggle = (channel) => {
    setNewNotification((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleSaveNotification = async () => {
    if (
      !newNotification.event ||
      !newNotification.audience ||
      !newNotification.template
    ) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      event: newNotification.event,
      audience: newNotification.audience,
      channels: newNotification.channels.join(","), // ✅ expected format
      template: newNotification.template,
      message: newNotification.message,
      status: "Active",
      active: true
    };

    try {
      const saved = await saveNotification(payload);
      setNotifications([...notifications, saved]);
      setShowNotificationForm(false);
      setNewNotification({
        event: "",
        audience: "",
        channels: [],
        template: "",
        message: ""
      });
    } catch (error) {
      console.error("❌ Failed to save notification:", error);
      alert("Failed to save notification. Check server logs and request format.");
    }
  };

  const toggleNotificationStatus = (index) => {
    const updated = [...notifications];
    updated[index].status =
      updated[index].status === "Active" ? "Inactive" : "Active";
    setNotifications(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Communication Tools
        </h1>

        <div className="flex space-x-4 border-b mb-6">
          {["templates", "triggers", "notifications"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                activeTab === tab
                  ? "border-b-2 border-purple-600 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setShowTriggerForm(false);
                setShowNotificationForm(false);
              }}
            >
              {tab === "templates"
                ? "Message Templates"
                : tab === "triggers"
                ? "Message Triggers"
                : "Event Notifications"}
            </button>
          ))}
        </div>

        {/* ==================== Templates Tab ==================== */}
        {activeTab === "templates" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={addTemplate}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                + New Template
              </button>
            </div>
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Content</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{t.title}</td>
                    <td className="px-4 py-2">{t.subject}</td>
                    <td className="px-4 py-2">{t.content}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleUseTemplate(t)}
                        className="text-blue-600 underline"
                      >
                        Use
                      </button>
                      <button
                        onClick={() => editTemplate(i)}
                        className="text-yellow-500 underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTemplate(i)}
                        className="text-red-500 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== Triggers Tab ==================== */}
        {activeTab === "triggers" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowTriggerForm(!showTriggerForm)}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                {showTriggerForm ? "Close Form" : "+ New Trigger"}
              </button>
            </div>

            {showTriggerForm && (
              <div className="mb-4 p-4 bg-gray-50 rounded border space-y-3">
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Trigger Name"
                  value={newTrigger.name}
                  onChange={(e) =>
                    setNewTrigger({ ...newTrigger, name: e.target.value })
                  }
                />
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Event"
                  value={newTrigger.event}
                  onChange={(e) =>
                    setNewTrigger({ ...newTrigger, event: e.target.value })
                  }
                />
                <select
                  className="border rounded p-2 w-full"
                  value={newTrigger.template}
                  onChange={(e) =>
                    setNewTrigger({ ...newTrigger, template: e.target.value })
                  }
                >
                  <option value="">Select Template</option>
                  {templates.map((t, i) => (
                    <option key={i} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-4">
                  {["Email", "SMS", "Push", "In-app"].map((method) => (
                    <label key={method} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newTrigger.deliveryMethods.includes(method)}
                        onChange={() => handleDeliveryToggle(method)}
                      />
                      {method}
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleSaveTrigger}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Save Trigger
                </button>
              </div>
            )}

            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Event</th>
                  <th className="px-4 py-2 text-left">Methods</th>
                  <th className="px-4 py-2 text-left">Template</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Last Sent</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {triggers.map((tr, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{tr.name}</td>
                    <td className="px-4 py-2">{tr.event}</td>
                    <td className="px-4 py-2">{tr.deliveryMethods}</td>
                    <td className="px-4 py-2">{tr.template}</td>
                    <td className="px-4 py-2">{tr.status || "Active"}</td>
                      <td className="px-4 py-2">{tr.lastSent}</td>
                    <td className="p-2">
                      <button
                          onClick={() => toggleTriggerStatus(i)}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${
                            tr.status === "Active" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        >
                          <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                              tr.status === "Active" ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== Notifications Tab ==================== */}
        {activeTab === "notifications" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowNotificationForm(!showNotificationForm)}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                {showNotificationForm ? "Close Form" : "+ New Notification"}
              </button>
            </div>

            {showNotificationForm && (
              <div className="mb-4 p-4 bg-gray-50 rounded border space-y-3">
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Event"
                  value={newNotification.event}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, event: e.target.value })
                  }
                />
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Audience"
                  value={newNotification.audience}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, audience: e.target.value })
                  }
                />
                <select
                  className="border rounded p-2 w-full"
                  value={newNotification.template}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, template: e.target.value })
                  }
                >
                  <option value="">Select Template</option>
                  {templates.map((t, i) => (
                    <option key={i} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Message"
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, message: e.target.value })
                  }
                />
                <div className="flex flex-wrap gap-4">
                  {["Email", "SMS", "Push", "In-app"].map((ch) => (
                    <label key={ch} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newNotification.channels.includes(ch)}
                        onChange={() => handleChannelToggle(ch)}
                      />
                      {ch}
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleSaveNotification}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Save Notification
                </button>
              </div>
            )}

            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Event</th>
                  <th className="px-4 py-2 text-left">Audience</th>
                  <th className="px-4 py-2 text-left">Channels</th>
                  <th className="px-4 py-2 text-left">Template</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((n, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{n.event}</td>
                    <td className="px-4 py-2">{n.audience}</td>
                    <td className="px-4 py-2">{n.channels}</td>
                    <td className="px-4 py-2">{n.template}</td>
                    <td className="px-4 py-2">{n.message}</td>
                    <td className="px-4 py-2">{n.status || "Active"}</td>
                    <td className="px-4 py-2">
                      <button
                          onClick={() => toggleNotificationStatus(i)}
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${
                            n.status === "Active" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        >
                          <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                              n.status === "Active" ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
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
}
