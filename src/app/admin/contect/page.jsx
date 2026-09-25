"use client";

import React, { useEffect, useState } from "react";

export default function AdminContect() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact");
        const result = await response.json();

        if (response.ok && result.success) {
          setContacts(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2b2b40]">
        <h1 className="text-2xl font-bold text-white">Contact Forms</h1>
      </div>

      {loading ? (
        <div className="bg-[#1e1e2d] p-6 rounded-xl border border-[#2b2b40] text-white">
          Loading contacts...
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-[#1e1e2d] p-6 rounded-xl border border-[#2b2b40]">
          <p className="text-[#92929f]">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-[#1e1e2d] p-5 rounded-xl border border-[#2b2b40] text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <p className="text-sm text-[#92929f]">{contact.email}</p>
                </div>
                <div className="text-xs text-[#92929f]">
                  {new Date(contact.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm text-[#d8d8df]">
                {contact.phone && <p><span className="text-[#92929f]">Phone:</span> {contact.phone}</p>}
                {contact.company && <p><span className="text-[#92929f]">Company:</span> {contact.company}</p>}
                {contact.projectType && <p><span className="text-[#92929f]">Project Type:</span> {contact.projectType}</p>}
                {contact.budget && <p><span className="text-[#92929f]">Budget:</span> {contact.budget}</p>}
                {contact.timeline && <p><span className="text-[#92929f]">Timeline:</span> {contact.timeline}</p>}
              </div>

              <div className="mt-4 border-t border-[#2b2b40] pt-4">
                <p className="text-xs uppercase tracking-wide text-[#92929f] mb-1">Subject</p>
                <p className="font-medium">{contact.subject}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-[#92929f] mb-1">Message</p>
                <p className="text-[#d8d8df] whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
