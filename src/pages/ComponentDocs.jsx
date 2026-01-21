import React, { useState } from 'react';
import {
    Button,
    Badge,
    Card,
    Input,
    Avatar,
    Spinner,
    InlineLoader,
    Shimmer,
    GradientText,
    Divider,
    ProgressBar,
    Tabs,
} from '@/components/common';

/**
 * Component Documentation Page
 * 
 * A comprehensive showcase of all TraceVenue common components.
 * Features code examples with toggle view for interns and developers.
 */

// ==================== CODE PREVIEW COMPONENT ====================
const CodeBlock = ({ code }) => (
    <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{code.trim()}</code>
    </pre>
);

const ComponentExample = ({ title, description, children, code, props }) => {
    const [showCode, setShowCode] = useState(false);

    return (
        <div className="mb-8 border border-[#e5e7eb] rounded-2xl overflow-hidden bg-white">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#e5e7eb] bg-[#fafafa] flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-[#060606]">{title}</h3>
                    {description && <p className="text-sm text-[#5c5f62] mt-1">{description}</p>}
                </div>
                <button
                    onClick={() => setShowCode(!showCode)}
                    className={`
                        px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                        ${showCode
                            ? 'bg-[#ff4000] text-white'
                            : 'bg-[#f0f0f4] text-[#5c5f62] hover:bg-[#e5e7eb]'
                        }
                    `}
                >
                    {showCode ? '✕ Hide Code' : '</> Show Code'}
                </button>
            </div>

            {/* Preview */}
            <div className="p-6 bg-white">
                {children}
            </div>

            {/* Code Section */}
            {showCode && (
                <div className="border-t border-[#e5e7eb]">
                    <div className="p-4 bg-[#1e1e1e]">
                        <CodeBlock code={code} />
                    </div>
                </div>
            )}

            {/* Props Table */}
            {props && showCode && (
                <div className="border-t border-[#e5e7eb] p-4 bg-[#fafafa]">
                    <h4 className="text-sm font-bold text-[#060606] mb-3">📋 Props</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#f0f0f4]">
                                    <th className="px-4 py-2 text-left font-semibold text-[#060606]">Prop</th>
                                    <th className="px-4 py-2 text-left font-semibold text-[#060606]">Type</th>
                                    <th className="px-4 py-2 text-left font-semibold text-[#060606]">Default</th>
                                    <th className="px-4 py-2 text-left font-semibold text-[#060606]">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.map((prop, i) => (
                                    <tr key={i} className="border-b border-[#e5e7eb]">
                                        <td className="px-4 py-2 font-mono text-[#ff4000]">{prop.name}</td>
                                        <td className="px-4 py-2 font-mono text-[#5c5f62]">{prop.type}</td>
                                        <td className="px-4 py-2 font-mono text-[#85878c]">{prop.default || '-'}</td>
                                        <td className="px-4 py-2 text-[#5c5f62]">{prop.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

// Section wrapper
const Section = ({ id, title, icon, description, children }) => (
    <section id={id} className="mb-16 scroll-mt-24">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#060606] flex items-center gap-2">
                <span>{icon}</span> {title}
            </h2>
            {description && <p className="text-[#5c5f62] mt-2">{description}</p>}
        </div>
        {children}
    </section>
);

// ==================== MAIN COMPONENT ====================
const ComponentDocs = () => {
    const [inputValue, setInputValue] = useState('');
    const [activeSection, setActiveSection] = useState('buttons');

    // Navigation items
    const navItems = [
        { id: 'buttons', label: 'Buttons', icon: '🎯' },
        { id: 'badges', label: 'Badges', icon: '🏷️' },
        { id: 'cards', label: 'Cards', icon: '📦' },
        { id: 'inputs', label: 'Inputs', icon: '📝' },
        { id: 'avatars', label: 'Avatars', icon: '👤' },
        { id: 'spinners', label: 'Spinners', icon: '⏳' },
        { id: 'shimmer', label: 'Shimmer', icon: '✨' },
        { id: 'progress', label: 'Progress', icon: '📊' },
        { id: 'text', label: 'Text', icon: '🌈' },
        { id: 'dividers', label: 'Dividers', icon: '➖' },
        { id: 'tabs', label: 'Tabs', icon: '📑' },
        { id: 'utilities', label: 'Utilities', icon: '🛠️' },
    ];

    const scrollToSection = (id) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* ========== HEADER ========== */}
            <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <GradientText as="h1" className="text-2xl font-bold">
                                TraceVenue UI
                            </GradientText>
                            <p className="text-sm text-[#5c5f62]">Component Library v1.0</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="success" size="sm">15 Components</Badge>
                            <Badge variant="gradient" size="sm">Ready to Use</Badge>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto flex">
                {/* ========== SIDEBAR NAVIGATION ========== */}
                <aside className="hidden lg:block w-56 shrink-0 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto border-r border-[#e5e7eb] bg-white">
                    <nav className="p-4">
                        <p className="text-xs font-bold text-[#85878c] uppercase tracking-wider mb-3">Components</p>
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`
                                            w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                                            transition-all duration-200 flex items-center gap-2
                                            ${activeSection === item.id
                                                ? 'bg-[#fff5f0] text-[#ff4000]'
                                                : 'text-[#5c5f62] hover:bg-[#f0f0f4]'
                                            }
                                        `}
                                    >
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <Divider className="my-4" />

                        <p className="text-xs font-bold text-[#85878c] uppercase tracking-wider mb-3">Quick Links</p>
                        <ul className="space-y-1">
                            <li>
                                <a href="#import" className="block px-3 py-2 rounded-lg text-sm text-[#5c5f62] hover:bg-[#f0f0f4]">
                                    📦 Import Guide
                                </a>
                            </li>
                            <li>
                                <a href="#colors" className="block px-3 py-2 rounded-lg text-sm text-[#5c5f62] hover:bg-[#f0f0f4]">
                                    🎨 Color Tokens
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* ========== MAIN CONTENT ========== */}
                <main className="flex-1 px-6 py-8 lg:px-12">

                    {/* Quick Start Banner */}
                    <Card variant="gradient" padding="lg" className="mb-10">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#060606] mb-1">👋 Welcome, Developer!</h2>
                                <p className="text-[#5c5f62]">Click <span className="font-mono bg-white px-2 py-0.5 rounded text-[#ff4000]">Show Code</span> on any example to see how to use it.</p>
                            </div>
                            <Button variant="primary" onClick={() => scrollToSection('import')}>
                                Get Started →
                            </Button>
                        </div>
                    </Card>

                    {/* ==================== BUTTONS ==================== */}
                    <Section id="buttons" title="Buttons" icon="🎯" description="Interactive elements for actions and navigation.">

                        <ComponentExample
                            title="Button Variants"
                            description="Different button styles for various contexts."
                            code={`import { Button } from '../components/common';

// Primary - Main actions
<Button variant="primary">Primary</Button>

// Secondary - Less prominent actions
<Button variant="secondary">Secondary</Button>

// Gradient - Special CTAs
<Button variant="gradient">Gradient</Button>

// Outline - Alternative actions
<Button variant="outline">Outline</Button>

// Ghost - Minimal style
<Button variant="ghost">Ghost</Button>`}
                            props={[
                                { name: 'variant', type: 'string', default: '"primary"', desc: 'primary | secondary | gradient | outline | ghost' },
                                { name: 'size', type: 'string', default: '"md"', desc: 'sm | md | lg' },
                                { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Makes button 100% width' },
                                { name: 'loading', type: 'boolean', default: 'false', desc: 'Shows loading spinner' },
                                { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the button' },
                                { name: 'leftIcon', type: 'ReactNode', default: '-', desc: 'Icon on the left' },
                                { name: 'rightIcon', type: 'ReactNode', default: '-', desc: 'Icon on the right' },
                            ]}
                        >
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="gradient">Gradient</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                            </div>
                        </ComponentExample>

                        <ComponentExample
                            title="Button Sizes"
                            description="Three sizes available for different use cases."
                            code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
                        >
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </ComponentExample>

                        <ComponentExample
                            title="Button States"
                            description="Loading and disabled states."
                            code={`// Loading state - shows spinner
<Button loading>Submit</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Full width button
<Button fullWidth>Full Width Button</Button>`}
                        >
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-4">
                                    <Button loading>Submit</Button>
                                    <Button disabled>Disabled</Button>
                                </div>
                                <Button fullWidth>Full Width Button</Button>
                            </div>
                        </ComponentExample>

                        <ComponentExample
                            title="Button with Icons"
                            description="Add icons to enhance buttons."
                            code={`<Button leftIcon={<span>⬅️</span>}>Back</Button>
<Button rightIcon={<span>➡️</span>}>Next</Button>
<Button variant="gradient" leftIcon={<span>📧</span>}>
    Send Email
</Button>`}
                        >
                            <div className="flex flex-wrap gap-4">
                                <Button leftIcon={<span>⬅️</span>}>Back</Button>
                                <Button rightIcon={<span>➡️</span>}>Next</Button>
                                <Button variant="gradient" leftIcon={<span>📧</span>}>Send Email</Button>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== BADGES ==================== */}
                    <Section id="badges" title="Badges" icon="🏷️" description="Status indicators and labels for categorization.">

                        <ComponentExample
                            title="Badge Variants"
                            description="Different badge styles for various statuses."
                            code={`import { Badge } from '../components/common';

<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="gradient">Gradient</Badge>
<Badge variant="soft">Soft</Badge>
<Badge variant="softSuccess">Soft Success</Badge>
<Badge variant="softError">Soft Error</Badge>`}
                            props={[
                                { name: 'variant', type: 'string', default: '"primary"', desc: 'primary | success | error | warning | info | outline | gradient | soft | softSuccess | softError' },
                                { name: 'size', type: 'string', default: '"md"', desc: 'sm | md | lg' },
                            ]}
                        >
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="primary">Primary</Badge>
                                <Badge variant="success">Success</Badge>
                                <Badge variant="error">Error</Badge>
                                <Badge variant="warning">Warning</Badge>
                                <Badge variant="info">Info</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="gradient">Gradient</Badge>
                                <Badge variant="soft">Soft</Badge>
                                <Badge variant="softSuccess">Soft Success</Badge>
                                <Badge variant="softError">Soft Error</Badge>
                            </div>
                        </ComponentExample>

                        <ComponentExample
                            title="Badge Sizes"
                            description="Badges in small, medium, and large sizes."
                            code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge size="sm">Small</Badge>
                                <Badge size="md">Medium</Badge>
                                <Badge size="lg">Large</Badge>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== CARDS ==================== */}
                    <Section id="cards" title="Cards" icon="📦" description="Container components for grouping related content.">

                        <ComponentExample
                            title="Card Variants"
                            description="Different card styles for various layouts."
                            code={`import { Card } from '../components/common';

// Default card
<Card variant="default" padding="md">
    <Card.Header>
        <h4>Title</h4>
    </Card.Header>
    <Card.Body>
        <p>Content goes here</p>
    </Card.Body>
    <Card.Footer>
        <Button>Action</Button>
    </Card.Footer>
</Card>

// Other variants: gradient, elevated, bordered, flat
<Card variant="gradient" padding="md">...</Card>
<Card variant="elevated" padding="md">...</Card>
<Card variant="bordered" padding="md">...</Card>
<Card variant="flat" padding="md">...</Card>

// Hoverable card
<Card variant="default" hoverable>...</Card>`}
                            props={[
                                { name: 'variant', type: 'string', default: '"default"', desc: 'default | gradient | elevated | bordered | flat' },
                                { name: 'padding', type: 'string', default: '"md"', desc: 'none | sm | md | lg' },
                                { name: 'hoverable', type: 'boolean', default: 'false', desc: 'Adds hover lift effect' },
                                { name: 'onClick', type: 'function', default: '-', desc: 'Click handler' },
                            ]}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Card variant="default" padding="md">
                                    <Card.Header><h4 className="font-semibold">Default</h4></Card.Header>
                                    <Card.Body><p>Basic card with shadow.</p></Card.Body>
                                </Card>
                                <Card variant="gradient" padding="md">
                                    <Card.Header><h4 className="font-semibold">Gradient</h4></Card.Header>
                                    <Card.Body><p>Gradient background.</p></Card.Body>
                                </Card>
                                <Card variant="elevated" padding="md">
                                    <Card.Header><h4 className="font-semibold">Elevated</h4></Card.Header>
                                    <Card.Body><p>Stronger shadow.</p></Card.Body>
                                </Card>
                                <Card variant="bordered" padding="md">
                                    <Card.Header><h4 className="font-semibold">Bordered</h4></Card.Header>
                                    <Card.Body><p>Accent border.</p></Card.Body>
                                </Card>
                                <Card variant="flat" padding="md">
                                    <Card.Header><h4 className="font-semibold">Flat</h4></Card.Header>
                                    <Card.Body><p>Minimal flat design.</p></Card.Body>
                                </Card>
                                <Card variant="default" padding="md" hoverable>
                                    <Card.Header><h4 className="font-semibold">Hoverable</h4></Card.Header>
                                    <Card.Body><p>Hover me!</p></Card.Body>
                                </Card>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== INPUTS ==================== */}
                    <Section id="inputs" title="Inputs" icon="📝" description="Form input fields and controls.">

                        <ComponentExample
                            title="Input Variants"
                            description="Different input states and configurations."
                            code={`import { Input } from '../components/common';

// Basic input
<Input 
    label="Email" 
    placeholder="Enter your email"
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>

// With icons
<Input 
    label="Search" 
    placeholder="Search..."
    leftIcon={<SearchIcon />}
/>

// Required field
<Input 
    label="Username" 
    placeholder="Enter username"
    required
/>

// Error state
<Input 
    label="Password" 
    error="Password is required"
/>

// Disabled
<Input 
    label="Readonly" 
    disabled
/>

// With helper text
<Input 
    label="Bio" 
    helperText="Max 500 characters"
/>`}
                            props={[
                                { name: 'label', type: 'string', default: '-', desc: 'Input label' },
                                { name: 'placeholder', type: 'string', default: '-', desc: 'Placeholder text' },
                                { name: 'value', type: 'string', default: '-', desc: 'Input value' },
                                { name: 'onChange', type: 'function', default: '-', desc: 'Change handler' },
                                { name: 'error', type: 'string', default: '-', desc: 'Error message' },
                                { name: 'helperText', type: 'string', default: '-', desc: 'Helper text below input' },
                                { name: 'leftIcon', type: 'ReactNode', default: '-', desc: 'Left icon' },
                                { name: 'rightIcon', type: 'ReactNode', default: '-', desc: 'Right icon' },
                                { name: 'required', type: 'boolean', default: 'false', desc: 'Required indicator' },
                                { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disabled state' },
                            ]}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Basic Input"
                                    placeholder="Enter text..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Input
                                    label="With Left Icon"
                                    placeholder="Search..."
                                    leftIcon={<span>🔍</span>}
                                />
                                <Input
                                    label="Required Field"
                                    placeholder="This is required"
                                    required
                                />
                                <Input
                                    label="With Error"
                                    placeholder="Invalid input"
                                    error="This field has an error"
                                />
                                <Input
                                    label="Disabled"
                                    placeholder="Can't edit"
                                    disabled
                                />
                                <Input
                                    label="Helper Text"
                                    placeholder="Password"
                                    type="password"
                                    helperText="Min 8 characters"
                                />
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== AVATARS ==================== */}
                    <Section id="avatars" title="Avatars" icon="👤" description="User profile images and initials display.">

                        <ComponentExample
                            title="Avatar Sizes & Types"
                            description="Display user avatars with images or initials."
                            code={`import { Avatar } from '../components/common';

// With initials (auto-generated from name)
<Avatar name="John Doe" size="md" />

// With image
<Avatar 
    src="https://example.com/avatar.jpg" 
    alt="John Doe"
    size="lg" 
/>

// Sizes: xs, sm, md, lg, xl
<Avatar name="JD" size="xs" />
<Avatar name="JD" size="sm" />
<Avatar name="JD" size="md" />
<Avatar name="JD" size="lg" />
<Avatar name="JD" size="xl" />

// Avatar Group (shows max 4, rest as count)
<Avatar.Group max={4}>
    <Avatar name="John" />
    <Avatar name="Jane" />
    <Avatar name="Bob" />
    <Avatar name="Alice" />
    <Avatar name="Charlie" /> {/* Shows as +2 */}
</Avatar.Group>`}
                            props={[
                                { name: 'src', type: 'string', default: '-', desc: 'Image URL' },
                                { name: 'name', type: 'string', default: '-', desc: 'Name for generating initials' },
                                { name: 'size', type: 'string', default: '"md"', desc: 'xs | sm | md | lg | xl' },
                                { name: 'alt', type: 'string', default: '-', desc: 'Alt text for image' },
                            ]}
                        >
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Sizes (with initials)</p>
                                    <div className="flex items-end gap-4">
                                        <Avatar size="xs" name="John Doe" />
                                        <Avatar size="sm" name="Jane Smith" />
                                        <Avatar size="md" name="Bob Wilson" />
                                        <Avatar size="lg" name="Alice Brown" />
                                        <Avatar size="xl" name="Charlie" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">With Images</p>
                                    <div className="flex items-center gap-4">
                                        <Avatar size="lg" src="https://randomuser.me/api/portraits/men/32.jpg" alt="John" />
                                        <Avatar size="lg" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Avatar Group</p>
                                    <Avatar.Group max={4}>
                                        <Avatar size="md" name="John" />
                                        <Avatar size="md" name="Jane" />
                                        <Avatar size="md" name="Bob" />
                                        <Avatar size="md" name="Alice" />
                                        <Avatar size="md" name="Charlie" />
                                        <Avatar size="md" name="Diana" />
                                    </Avatar.Group>
                                </div>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== SPINNERS ==================== */}
                    <Section id="spinners" title="Spinners & Loaders" icon="⏳" description="Loading indicators for async operations.">

                        <ComponentExample
                            title="Spinner Sizes & Colors"
                            description="Various loading spinner configurations."
                            code={`import { Spinner, InlineLoader, PageLoader } from '../components/common';

// Basic spinner with sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Colors
<Spinner size="md" color="primary" />
<Spinner size="md" color="white" />
<Spinner size="md" color="gray" />

// Inline loader with message
<InlineLoader message="Loading data..." />

// Full page loader (use sparingly)
<PageLoader message="Please wait..." />`}
                            props={[
                                { name: 'size', type: 'string', default: '"md"', desc: 'sm | md | lg | xl' },
                                { name: 'color', type: 'string', default: '"primary"', desc: 'primary | white | gray' },
                            ]}
                        >
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Sizes</p>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <Spinner size="sm" />
                                            <p className="text-xs mt-2 text-[#5c5f62]">sm</p>
                                        </div>
                                        <div className="text-center">
                                            <Spinner size="md" />
                                            <p className="text-xs mt-2 text-[#5c5f62]">md</p>
                                        </div>
                                        <div className="text-center">
                                            <Spinner size="lg" />
                                            <p className="text-xs mt-2 text-[#5c5f62]">lg</p>
                                        </div>
                                        <div className="text-center">
                                            <Spinner size="xl" />
                                            <p className="text-xs mt-2 text-[#5c5f62]">xl</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Colors</p>
                                    <div className="flex items-center gap-6">
                                        <Spinner size="md" color="primary" />
                                        <div className="bg-[#ff4000] p-3 rounded-lg">
                                            <Spinner size="md" color="white" />
                                        </div>
                                        <Spinner size="md" color="gray" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Inline Loader</p>
                                    <InlineLoader message="Loading data..." />
                                </div>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== SHIMMER ==================== */}
                    <Section id="shimmer" title="Shimmer / Skeletons" icon="✨" description="Placeholder loading states for content.">

                        <ComponentExample
                            title="Shimmer Components"
                            description="Use shimmers as loading placeholders."
                            code={`import { Shimmer } from '../components/common';

// Basic shimmer
<Shimmer height="1rem" width="100%" rounded="md" />

// Text shimmer (multiple lines)
<Shimmer.Text lines={3} />

// Card shimmer
<Shimmer.Card />

// Avatar shimmer
<Shimmer.Avatar size={48} />

// Button shimmer
<Shimmer.Button width="8rem" />`}
                            props={[
                                { name: 'width', type: 'string', default: '"100%"', desc: 'Width of shimmer' },
                                { name: 'height', type: 'string', default: '"1rem"', desc: 'Height of shimmer' },
                                { name: 'rounded', type: 'string', default: '"md"', desc: 'none | sm | md | lg | xl | full | pill' },
                            ]}
                        >
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Basic Shimmer</p>
                                    <div className="space-y-2">
                                        <Shimmer height="1rem" width="100%" />
                                        <Shimmer height="1rem" width="80%" />
                                        <Shimmer height="1rem" width="60%" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Shimmer.Text</p>
                                    <Shimmer.Text lines={3} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Shimmer.Card</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Shimmer.Card />
                                        <Shimmer.Card />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Shimmer.Avatar & Shimmer.Button</p>
                                    <div className="flex items-center gap-4">
                                        <Shimmer.Avatar size={48} />
                                        <Shimmer.Avatar size={48} />
                                        <Shimmer.Button width="8rem" />
                                    </div>
                                </div>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== PROGRESS ==================== */}
                    <Section id="progress" title="Progress Bars" icon="📊" description="Visual indicators for progress and completion.">

                        <ComponentExample
                            title="Progress Bar Types"
                            description="Linear and circular progress indicators."
                            code={`import { ProgressBar } from '../components/common';

// Linear progress
<ProgressBar value={50} />
<ProgressBar value={75} variant="success" />
<ProgressBar value={100} showLabel height={20} />

// Circular progress
<ProgressBar.Circle value={75} />
<ProgressBar.Circle value={50} size={100} strokeWidth={10} />`}
                            props={[
                                { name: 'value', type: 'number', default: '0', desc: 'Progress value (0-100)' },
                                { name: 'variant', type: 'string', default: '"gradient"', desc: 'default | gradient | success' },
                                { name: 'showLabel', type: 'boolean', default: 'false', desc: 'Show percentage label' },
                                { name: 'height', type: 'number', default: '6', desc: 'Height in pixels' },
                            ]}
                        >
                            <div className="space-y-8">
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Linear Progress</p>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-xs text-[#85878c]">Default (25%)</span>
                                            <ProgressBar value={25} variant="default" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#85878c]">Gradient (50%)</span>
                                            <ProgressBar value={50} variant="gradient" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#85878c]">Success (75%)</span>
                                            <ProgressBar value={75} variant="success" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-[#85878c]">With Label (100%)</span>
                                            <ProgressBar value={100} showLabel height={20} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Circular Progress</p>
                                    <div className="flex flex-wrap items-center gap-8">
                                        <ProgressBar.Circle value={25} />
                                        <ProgressBar.Circle value={50} />
                                        <ProgressBar.Circle value={75} />
                                        <ProgressBar.Circle value={100} />
                                    </div>
                                </div>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== GRADIENT TEXT ==================== */}
                    <Section id="text" title="Gradient Text" icon="🌈" description="Text with signature TraceVenue gradient.">

                        <ComponentExample
                            title="Gradient Text Usage"
                            description="Apply gradient to headings and inline text."
                            code={`import { GradientText } from '../components/common';

// As heading
<GradientText as="h1" className="text-4xl font-bold">
    Welcome to TraceVenue
</GradientText>

// Inline in paragraph
<p>
    Our <GradientText className="font-bold">premium</GradientText> services.
</p>`}
                            props={[
                                { name: 'as', type: 'string', default: '"span"', desc: 'HTML element to render (h1, h2, p, span, etc.)' },
                                { name: 'className', type: 'string', default: '-', desc: 'Additional CSS classes' },
                            ]}
                        >
                            <div className="space-y-4">
                                <GradientText as="h1" className="text-4xl font-bold">
                                    Large Heading
                                </GradientText>
                                <GradientText as="h2" className="text-2xl font-semibold">
                                    Medium Heading
                                </GradientText>
                                <p className="text-lg">
                                    Regular text with <GradientText className="font-bold">inline gradient</GradientText> text.
                                </p>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== DIVIDERS ==================== */}
                    <Section id="dividers" title="Dividers" icon="➖" description="Visual separators for content sections.">

                        <ComponentExample
                            title="Divider Variants"
                            description="Different divider styles."
                            code={`import { Divider } from '../components/common';

// Solid line
<Divider variant="solid" />

// Dashed line
<Divider variant="dashed" />

// Gradient fade
<Divider variant="gradient" />

// With centered text
<Divider text="OR" />

// Vertical (use inside flex container)
<div style={{ height: 50 }}>
    <Divider orientation="vertical" />
</div>`}
                            props={[
                                { name: 'variant', type: 'string', default: '"solid"', desc: 'solid | dashed | gradient' },
                                { name: 'orientation', type: 'string', default: '"horizontal"', desc: 'horizontal | vertical' },
                                { name: 'text', type: 'string', default: '-', desc: 'Centered text label' },
                            ]}
                        >
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs text-[#85878c]">Solid</span>
                                    <Divider variant="solid" />
                                </div>
                                <div>
                                    <span className="text-xs text-[#85878c]">Dashed</span>
                                    <Divider variant="dashed" />
                                </div>
                                <div>
                                    <span className="text-xs text-[#85878c]">Gradient</span>
                                    <Divider variant="gradient" />
                                </div>
                                <div>
                                    <span className="text-xs text-[#85878c]">With Text</span>
                                    <Divider text="OR" />
                                </div>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== TABS ==================== */}
                    <Section id="tabs" title="Tabs" icon="📑" description="Tabbed navigation for organizing content.">

                        <ComponentExample
                            title="Tab Variants"
                            description="Default underline and pill-style tabs."
                            code={`import { Tabs } from '../components/common';

// Default tabs (underline style)
<Tabs
    variant="default"
    defaultTab="tab1"
    onChange={(tabId) => console.log(tabId)}
    tabs={[
        { id: 'tab1', label: 'Overview', content: <p>Overview content</p> },
        { id: 'tab2', label: 'Details', content: <p>Details content</p> },
        { id: 'tab3', label: 'Reviews', content: <p>Reviews content</p> },
    ]}
/>

// Pills tabs
<Tabs
    variant="pills"
    tabs={[
        { id: 'all', label: 'All', content: <p>All items</p> },
        { id: 'active', label: 'Active', content: <p>Active items</p> },
    ]}
/>`}
                            props={[
                                { name: 'tabs', type: 'array', default: '[]', desc: 'Array of { id, label, content }' },
                                { name: 'variant', type: 'string', default: '"default"', desc: 'default | pills' },
                                { name: 'defaultTab', type: 'string', default: '-', desc: 'ID of initially active tab' },
                                { name: 'onChange', type: 'function', default: '-', desc: 'Callback when tab changes' },
                            ]}
                        >
                            <div className="space-y-8">
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Default (Underline)</p>
                                    <Tabs
                                        variant="default"
                                        tabs={[
                                            { id: 'tab1', label: 'Overview', content: <p className="text-[#5c5f62]">This is the overview content.</p> },
                                            { id: 'tab2', label: 'Details', content: <p className="text-[#5c5f62]">These are the details.</p> },
                                            { id: 'tab3', label: 'Reviews', content: <p className="text-[#5c5f62]">Customer reviews here.</p> },
                                        ]}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#5c5f62] mb-3">Pills</p>
                                    <Tabs
                                        variant="pills"
                                        tabs={[
                                            { id: 'all', label: 'All', content: <p className="text-[#5c5f62]">All items displayed.</p> },
                                            { id: 'active', label: 'Active', content: <p className="text-[#5c5f62]">Only active items.</p> },
                                            { id: 'completed', label: 'Completed', content: <p className="text-[#5c5f62]">Completed items.</p> },
                                        ]}
                                    />
                                </div>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== IMPORT GUIDE ==================== */}
                    <Section id="import" title="Import Guide" icon="📦" description="How to import and use components.">

                        <Card variant="flat" padding="lg" className="mb-6">
                            <h3 className="text-lg font-bold text-[#060606] mb-4">Quick Import</h3>
                            <CodeBlock code={`// Import individual components
import { Button, Badge, Card, Input } from '../components/common';

// Example usage
function MyComponent() {
    return (
        <Card variant="default" padding="md">
            <h2>Hello World</h2>
            <Button variant="primary">Click Me</Button>
        </Card>
    );
}`} />
                        </Card>

                        <Card variant="flat" padding="lg" className="mb-6">
                            <h3 className="text-lg font-bold text-[#060606] mb-4">All Available Components</h3>
                            <CodeBlock code={`// Core Components
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { Select } from './Select';
export { Modal } from './Modal';
export { Badge } from './Badge';

// Feedback Components
export { Shimmer } from './Shimmer';
export { Spinner, PageLoader, InlineLoader, ButtonLoader } from './Spinner';
export { ProgressBar } from './ProgressBar';
export { Toast, ToastProvider, useToast } from './Toast';

// Layout Components
export { Tabs } from './Tabs';
export { Avatar } from './Avatar';
export { Divider } from './Divider';
export { Dropdown } from './Dropdown';

// Utility Components
export { GradientText } from './GradientText';`} />
                        </Card>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== UTILITY CLASSES ==================== */}
                    <Section id="utilities" title="Utility Classes" icon="🛠️" description="CSS utility classes for quick styling.">

                        <ComponentExample
                            title="Text Color Classes"
                            description="Apply text colors using utility classes."
                            code={`// Brand Colors
<p className="text-primary">Primary text</p>
<p className="text-primary-light">Primary light text</p>
<p className="text-primary-dark">Primary dark text</p>

// Semantic Colors
<p className="text-success">Success text</p>
<p className="text-error">Error text</p>
<p className="text-warning">Warning text</p>
<p className="text-info">Info text</p>

// Neutral Colors
<p className="text-body">Body text (default)</p>
<p className="text-secondary">Secondary text</p>
<p className="text-muted">Muted text</p>
<p className="text-disabled">Disabled text</p>
<p className="text-inverse">Inverse text (for dark bg)</p>`}
                        >
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-[#85878c] uppercase mb-2">Brand Colors</p>
                                    <div className="flex flex-wrap gap-4">
                                        <span className="text-primary font-medium">.text-primary</span>
                                        <span className="text-primary-light font-medium">.text-primary-light</span>
                                        <span className="text-primary-dark font-medium">.text-primary-dark</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#85878c] uppercase mb-2">Semantic Colors</p>
                                    <div className="flex flex-wrap gap-4">
                                        <span className="text-success font-medium">.text-success</span>
                                        <span className="text-error font-medium">.text-error</span>
                                        <span className="text-warning font-medium">.text-warning</span>
                                        <span className="text-info font-medium">.text-info</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#85878c] uppercase mb-2">Neutral Colors</p>
                                    <div className="flex flex-wrap gap-4">
                                        <span className="text-body font-medium">.text-body</span>
                                        <span className="text-secondary font-medium">.text-secondary</span>
                                        <span className="text-muted font-medium">.text-muted</span>
                                        <span className="text-disabled font-medium">.text-disabled</span>
                                        <span className="bg-[#060606] px-2 py-1 rounded text-inverse font-medium">.text-inverse</span>
                                    </div>
                                </div>
                            </div>
                        </ComponentExample>

                        <ComponentExample
                            title="Background Color Classes"
                            description="Apply background colors using utility classes."
                            code={`// Brand Colors
<div className="bg-primary">Primary background</div>
<div className="bg-primary-light">Primary light</div>
<div className="bg-primary-dark">Primary dark</div>

// Semantic Colors
<div className="bg-success">Success</div>
<div className="bg-success-light">Success light</div>
<div className="bg-error">Error</div>
<div className="bg-error-light">Error light</div>
<div className="bg-warning">Warning</div>
<div className="bg-info">Info</div>

// Neutral Colors
<div className="bg-surface">Surface (white)</div>
<div className="bg-background">Background</div>
<div className="bg-background-alt">Alt background</div>

// Gradients
<div className="bg-gradient-primary">Gradient primary</div>
<div className="bg-gradient-card">Gradient card</div>`}
                        >
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-[#85878c] uppercase mb-2">Brand Colors</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm">.bg-primary</span>
                                        <span className="bg-primary-light text-white px-3 py-1.5 rounded-lg text-sm">.bg-primary-light</span>
                                        <span className="bg-primary-dark text-white px-3 py-1.5 rounded-lg text-sm">.bg-primary-dark</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#85878c] uppercase mb-2">Semantic Colors</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-success text-white px-3 py-1.5 rounded-lg text-sm">.bg-success</span>
                                        <span className="bg-success-light text-success px-3 py-1.5 rounded-lg text-sm">.bg-success-light</span>
                                        <span className="bg-error text-white px-3 py-1.5 rounded-lg text-sm">.bg-error</span>
                                        <span className="bg-error-light text-error px-3 py-1.5 rounded-lg text-sm">.bg-error-light</span>
                                        <span className="bg-warning text-white px-3 py-1.5 rounded-lg text-sm">.bg-warning</span>
                                        <span className="bg-info text-white px-3 py-1.5 rounded-lg text-sm">.bg-info</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#85878c] uppercase mb-2">Neutral & Gradients</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-surface border border-[#e5e7eb] px-3 py-1.5 rounded-lg text-sm">.bg-surface</span>
                                        <span className="bg-background px-3 py-1.5 rounded-lg text-sm">.bg-background</span>
                                        <span className="bg-gradient-primary text-white px-3 py-1.5 rounded-lg text-sm">.bg-gradient-primary</span>
                                        <span className="bg-gradient-card px-3 py-1.5 rounded-lg text-sm">.bg-gradient-card</span>
                                    </div>
                                </div>
                            </div>
                        </ComponentExample>

                        <ComponentExample
                            title="Border Color Classes"
                            description="Apply border colors using utility classes."
                            code={`// Use with border utility
<div className="border border-primary">Primary border</div>
<div className="border border-success">Success border</div>
<div className="border border-error">Error border</div>
<div className="border border-warning">Warning border</div>
<div className="border border-default">Default border</div>
<div className="border border-light">Light border</div>`}
                        >
                            <div className="flex flex-wrap gap-3">
                                <span className="border-2 border-primary px-3 py-1.5 rounded-lg text-sm">.border-primary</span>
                                <span className="border-2 border-success px-3 py-1.5 rounded-lg text-sm">.border-success</span>
                                <span className="border-2 border-error px-3 py-1.5 rounded-lg text-sm">.border-error</span>
                                <span className="border-2 border-warning px-3 py-1.5 rounded-lg text-sm">.border-warning</span>
                                <span className="border-2 border-default px-3 py-1.5 rounded-lg text-sm">.border-default</span>
                                <span className="border-2 border-light px-3 py-1.5 rounded-lg text-sm">.border-light</span>
                            </div>
                        </ComponentExample>
                    </Section>

                    <Divider variant="gradient" className="my-10" />

                    {/* ==================== COLOR TOKENS ==================== */}
                    <Section id="colors" title="Color Tokens" icon="🎨" description="Design system color variables.">

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[
                                { name: '--color-primary', color: '#ff4000', label: 'Primary' },
                                { name: '--color-primary-light', color: '#ff6b35', label: 'Primary Light' },
                                { name: '--color-primary-dark', color: '#e63900', label: 'Primary Dark' },
                                { name: '--color-success', color: '#15b076', label: 'Success' },
                                { name: '--color-error', color: '#e74c3c', label: 'Error' },
                                { name: '--color-warning', color: '#e67e22', label: 'Warning' },
                                { name: '--color-info', color: '#3498db', label: 'Info' },
                                { name: '--color-text-primary', color: '#060606', label: 'Text Primary' },
                                { name: '--color-text-secondary', color: '#5c5f62', label: 'Text Secondary' },
                                { name: '--color-text-muted', color: '#85878c', label: 'Text Muted' },
                                { name: '--color-border', color: '#d7d9da', label: 'Border' },
                                { name: '--color-background', color: '#f0f0f4', label: 'Background' },
                            ].map((token) => (
                                <div key={token.name} className="text-center">
                                    <div
                                        className="w-full h-16 rounded-xl border border-[#e5e7eb] mb-2"
                                        style={{ backgroundColor: token.color }}
                                    />
                                    <p className="text-sm font-medium text-[#060606]">{token.label}</p>
                                    <p className="text-xs text-[#85878c] font-mono">{token.color}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                </main>
            </div>

            {/* ========== FOOTER ========== */}
            <footer className="bg-white border-t border-[#e5e7eb] py-6 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[#5c5f62]">
                        TraceVenue Design System v1.0 • Built with ❤️ for developers
                    </p>
                    <p className="text-sm text-[#85878c] mt-1">
                        Click <span className="font-mono bg-[#f0f0f4] px-2 py-0.5 rounded text-[#ff4000]">Show Code</span> on any component to see usage examples
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ComponentDocs;
