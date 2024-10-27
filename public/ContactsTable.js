const ContactsTable = ({ contacts = [], onAddContact }) => {
    console.log("ContactsTable received contacts:", contacts);

    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
    const [showAddDialog, setShowAddDialog] = React.useState(false);
    const [newContact, setNewContact] = React.useState({
        firstName: '', lastName: '', email: '', jobTitle: '', phone: ''
    });

    const contactsData = Array.isArray(contacts) ? contacts : [];
    const headers = contactsData[0] || ['First Name', 'Last Name', 'Email', 'Job Title', 'Phone'];

    contactsData.forEach((row, rowIndex) => {
        const nonEmptyFields = row.filter(cell => cell);

        if (nonEmptyFields.length === 0) {
            console.warn(`Row ${rowIndex} is completely empty`, row);
        } else if (row.length < headers.length - 1) {
            console.warn(`Row ${rowIndex} has an unexpected structure`, row);
        }
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedContacts = React.useMemo(() => {
        if (contactsData.length <= 1) return [];
        let filtered = contactsData.slice(1);

        if (searchTerm) {
            filtered = filtered.filter(contact =>
                contact.some(field => 
                    String(field).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (sortConfig.key !== null) {
            filtered.sort((a, b) => {
                const aValue = String(a[sortConfig.key] || '');
                const bValue = String(b[sortConfig.key] || '');
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [contactsData, searchTerm, sortConfig]);

    const handleAddContact = () => {
        console.log("Adding contact with data:", newContact);

        const newContactArray = [
            newContact.firstName,
            newContact.lastName,
            newContact.email,
            newContact.jobTitle,
            newContact.phone
        ];

        onAddContact(newContactArray);
        setNewContact({
            firstName: '', lastName: '', email: '', jobTitle: '', phone: ''
        });
        setShowAddDialog(false);
    };

    const mainTable = React.createElement('div', { className: "space-y-4 p-4" },
        React.createElement('div', {
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                gap: '1rem'
            }
        },
            React.createElement('input', {
                type: "text",
                placeholder: "Search contacts...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                style: {
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    width: '300px'
                }
            }),
            React.createElement('button', {
                onClick: () => setShowAddDialog(true),
                style: {
                    backgroundColor: '#4a3a40',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }
            }, "Add Contact")
        ),
        React.createElement('div', {
            style: {
                overflowX: 'auto',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }
        },
            React.createElement('table', {
                style: {
                    width: '100%',
                    borderCollapse: 'separate',
                    borderSpacing: 0
                }
            },
                React.createElement('thead', {},
                    React.createElement('tr', {},
                        headers.map((header, index) =>
                            React.createElement('th', {
                                key: `header-${index}`,
                                onClick: () => handleSort(index),
                                style: {
                                    padding: '1rem',
                                    backgroundColor: '#4a3a40',
                                    color: 'white',
                                    textAlign: 'left',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }
                            }, header)
                        )
                    )
                ),
                React.createElement('tbody', {},
                    filteredAndSortedContacts.map((contact, rowIndex) =>
                        React.createElement('tr', {
                            key: `row-${rowIndex}`,
                            style: {
                                backgroundColor: rowIndex % 2 === 0 ? 'white' : '#f9f9f9'
                            }
                        },
                            contact.map((cell, cellIndex) =>
                                React.createElement('td', {
                                    key: `cell-${rowIndex}-${cellIndex}`,
                                    style: {
                                        padding: '1rem',
                                        borderBottom: '1px solid #eee'
                                    }
                                }, cell || 'N/A')
                            )
                        )
                    )
                )
            )
        )
    );

    // Glass-blurred background and centered card styling for the modal
    const modal = showAddDialog ? React.createElement('div', {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(10px)',  // Glass-blurred effect
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }
    },
        React.createElement('div', {
            style: {
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                width: '90%',
                maxWidth: '500px',
                zIndex: 1001 // Make sure it's above the blurred background
            }
        },
            React.createElement('h2', { 
                style: {
                    marginBottom: '1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }
            }, "Add New Contact"),
            [
                { placeholder: "First Name", key: "firstName" },
                { placeholder: "Last Name", key: "lastName" },
                { placeholder: "Email", key: "email", type: "email" },
                { placeholder: "Job Title", key: "jobTitle" },
                { placeholder: "Phone", key: "phone" }
            ].map(field =>
                React.createElement('input', {
                    key: field.key,
                    type: field.type || 'text',
                    placeholder: field.placeholder,
                    value: newContact[field.key],
                    onChange: (e) => setNewContact({
                        ...newContact,
                        [field.key]: e.target.value
                    }),
                    style: {
                        width: '100%',
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }
                })
            ),
            React.createElement('div', {
                style: {
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1.5rem'
                }
            },
                React.createElement('button', {
                    onClick: handleAddContact,
                    style: {
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#4a3a40',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }
                }, "Add Contact"),
                React.createElement('button', {
                    onClick: () => setShowAddDialog(false),
                    style: {
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#e5e5e5',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }
                }, "Cancel")
            )
        )
    ) : null;

    return React.createElement(React.Fragment, null, mainTable, modal);
};

export default ContactsTable;
