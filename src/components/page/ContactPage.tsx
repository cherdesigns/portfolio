import React from 'react';
import Line from '../common/Line';
import { handleFormSubmit, FORM_ACTION } from '../../util/excel-form-submission';

type ContactPageProps = {};

function ContactPage(props: ContactPageProps) {
    const fields = [
        { name: 'name', label: 'Name', placeholder: 'Your name' },
        { name: 'email', label: 'Email', placeholder: 'Your email address' },
        { name: 'subject', label: 'Subject', placeholder: 'Email subject' },
    ];

    return (
        <form
            method='POST'
            onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(e.target as HTMLFormElement);
            }}
            action={FORM_ACTION}
            style={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'flex-start',
                flex: 1,
                padding: 24,
                overflow: 'scroll',
            }}
        >
            <h1 style={{ marginBottom: 0 }}>Contact</h1>
            <Line />
            <div
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    width: '100%',
                }}
            >
                {fields.map(({ name, label, placeholder }) => (
                    <div
                        key={name}
                        className='chip'
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexFlow: 'row',
                            marginBottom: 8,
                            width: 'fit-content',
                        }}
                    >
                        <label htmlFor={name} style={{ marginRight: 16, width: 64 }}>
                            {label}
                        </label>
                        <input name={name} placeholder={placeholder} />
                    </div>
                ))}
                <div
                    className='chip'
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexFlow: 'row',
                        marginBottom: 8,
                    }}
                >
                    <label htmlFor='name' style={{ marginRight: 16, width: 64 }}>
                        Message
                    </label>
                    <textarea name='message' placeholder='Email message' style={{ maxHeight: 260, width: '100%' }} />
                </div>
                <input
                    type='submit'
                    value='Submit'
                    className='primary-button'
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexFlow: 'row',
                        width: 'fit-content',
                    }}
                />
            </div>
        </form>
    );
}

export default ContactPage;
