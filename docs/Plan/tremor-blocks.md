# Tremor Blocks

## ProgressBar Component

```jsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'amber' | 'indigo';
  showValue?: boolean;
}

export const ProgressBar = ({
  value,
  className,
  color = 'blue',
  showValue = false,
}: ProgressBarProps) => {
  // Ensure value is between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  // Color mapping
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    indigo: 'bg-indigo-500',
  };
  
  const barColor = colorMap[color];
  
  return (
    <div className={cn('w-full', className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-tremor-full bg-tremor-background dark:bg-dark-tremor-background">
        <div
          className={cn('absolute h-full rounded-tremor-full transition-all duration-500', barColor)}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showValue && (
        <p className="mt-1 text-right text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {clampedValue}%
        </p>
      )}
    </div>
  );
};
```

## ProgressBarHero Example

```jsx
import { ProgressBar } from 'components/ProgressBar';

export const ProgressBarHero = () => {
  return <ProgressBar value={62} className="mx-auto" />;
};
```

## User Management Block

```jsx
'use client';

import { RiDeleteBin7Line } from '@remixicon/react';
import {
  Divider,
  List,
  ListItem,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
} from '@tremor/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const existingUsers = [
  {
    name: 'Lena Stone',
    email: 'lena.stone@company.com',
    initials: 'LS',
    currentRole: 'Admin',
    color: 'bg-blue-500',
  },
  {
    name: 'John Miller',
    email: 'john.miller@company.com',
    initials: 'JM',
    currentRole: 'Guest',
    color: 'bg-fuchsia-500',
  },
  {
    name: 'Emma Crombie',
    email: 'emma.crombie@company.com',
    initials: 'EC',
    currentRole: 'Guest',
    color: 'bg-violet-500',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    initials: 'SJ',
    currentRole: 'Member',
    color: 'bg-pink-500',
  },
  {
    name: 'Alex Carter',
    email: 'alex.carter@company.com',
    initials: 'AC',
    currentRole: 'Member',
    color: 'bg-indigo-500',
  },
];

const pendingUsers = [
  {
    name: 'Mike River',
    email: 'mike.river@company.com',
    initials: 'MR',
    color: 'bg-indigo-500',
  },
  {
    name: 'Aaron Hill',
    email: 'aaron.hill@company.com',
    initials: 'AH',
    color: 'bg-fuchsia-500',
  },
];

export default function Example() {
  return (
    <>
      <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        General
      </h3>
      <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
        Manage your personal details, workspace governance and notifications.
      </p>
      <TabGroup defaultIndex={1} className="mt-6">
        <TabList>
          <Tab>Account details</Tab>
          <Tab>Members</Tab>
          <Tab>Billing</Tab>
        </TabList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-3">
          <div>
            <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Members
            </h3>
            <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Manage roles of existing members. As an admin, you can add, edit
              or delete users.
            </p>
            <button
              type="button"
              className="mt-4 whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Invite member
            </button>
          </div>
          <form action="#" method="post" className="lg:col-span-2">
            <List>
              {existingUsers.map((user) => (
                <ListItem key={user.name} className="block py-3 md:flex">
                  <div className="flex items-center space-x-4">
                    <span
                      className={classNames(
                        user.color,
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-tremor-full text-tremor-label text-tremor-brand-inverted dark:text-tremor-brand-inverted',
                      )}
                      aria-hidden={true}
                    >
                      {user.initials}
                    </span>
                    <div>
                      <label
                        htmlFor={user.name}
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                      >
                        {user.name}
                      </label>
                      <p className="text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2 md:mt-0">
                    <Select
                      id={user.name}
                      name={user.name}
                      className="md:w-44 [&>*]:w-full [&>button]:rounded-tremor-small"
                      defaultValue={user.currentRole}
                      enableClear={false}
                    >
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Guest">Guest</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                    </Select>
                    <button className="flex h-9 items-center justify-center px-2 text-tremor-content-subtle hover:text-red-500 dark:text-dark-tremor-content-subtle hover:dark:text-red-500">
                      <RiDeleteBin7Line
                        className="size-5 shrink-0"
                        aria-hidden={true}
                      />
                      <span className="sr-only">Remove {user.name}</span>
                    </button>
                  </div>
                </ListItem>
              ))}
            </List>
          </form>
        </div>
        <Divider />
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-3">
          <div>
            <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pending Invites
            </h3>
            <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Invited users who haven't accepted their invitation yet.
            </p>
          </div>
          <form className="lg:col-span-2">
            <List>
              {pendingUsers.map((user) => (
                <ListItem key={user.name} className="block py-3 md:flex">
                  <div className="flex items-center space-x-4">
                    <span
                      className={classNames(
                        user.color,
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-tremor-full text-tremor-label text-tremor-brand-inverted dark:text-tremor-brand-inverted',
                      )}
                      aria-hidden={true}
                    >
                      {user.initials}
                    </span>
                    <div>
                      <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {user.name}
                      </p>
                      <p className="text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center space-x-2 md:mt-0">
                    <button
                      type="button"
                      className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-tremor-small border border-tremor-border bg-tremor-background px-3 py-2 text-tremor-default font-medium text-tremor-brand shadow-tremor-input hover:text-tremor-brand-emphasis dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-brand dark:shadow-dark-tremor-input hover:dark:text-dark-tremor-brand-emphasis md:w-44"
                    >
                      Resend invite
                    </button>
                    <button className="flex h-9 items-center justify-center px-2 text-tremor-content-subtle hover:text-red-500 dark:text-dark-tremor-content-subtle hover:dark:text-red-500">
                      <RiDeleteBin7Line
                        className="size-5 shrink-0"
                        aria-hidden={true}
                      />
                      <span className="sr-only">Remove {user.name}</span>
                    </button>
                  </div>
                </ListItem>
              ))}
            </List>
          </form>
        </div>
      </TabGroup>
    </>
  );
}