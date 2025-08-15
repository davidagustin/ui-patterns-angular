import { Component } from '@angular/core';

interface Pattern {
  name: string;
  path: string;
  description: string;
}

interface PatternCategory {
  category: string;
  patterns: Pattern[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  uiPatterns: PatternCategory[] = [
    // Getting input
    { 
      category: "Getting Input", 
      patterns: [
        { name: "Forms", path: "/patterns/forms", description: "Collect user input with validation and feedback" },
        { name: "Structured Format", path: "/patterns/structured-format", description: "Format input with specific patterns" },
        { name: "Autosave", path: "/patterns/autosave", description: "Automatically save user progress" },
        { name: "Rule Builder", path: "/patterns/rule-builder", description: "Create complex rules and conditions" },
        { name: "Keyboard Shortcuts", path: "/patterns/keyboard-shortcuts", description: "Power user keyboard navigation" },
        { name: "Captcha", path: "/patterns/captcha", description: "Verify human users" },
        { name: "Drag and Drop", path: "/patterns/drag-drop", description: "Intuitive drag and drop interactions" },
        { name: "Inplace Editor", path: "/patterns/inplace-editor", description: "Edit content directly in context" },
        { name: "Preview", path: "/patterns/preview", description: "Show live previews of changes" },
        { name: "Morphing Controls", path: "/patterns/morphing-controls", description: "Controls that transform based on context" },
        { name: "Password Strength Meter", path: "/patterns/password-strength", description: "Visual password security feedback" },
        { name: "Fill in the Blanks", path: "/patterns/fill-blanks", description: "Interactive form completion" },
        { name: "WYSIWYG", path: "/patterns/wysiwyg", description: "What you see is what you get editor" },
        { name: "Input Feedback", path: "/patterns/input-feedback", description: "Real-time input validation" },
        { name: "Calendar Picker", path: "/patterns/calendar-picker", description: "Date and time selection" },
        { name: "Expandable Input", path: "/patterns/expandable-input", description: "Inputs that grow with content" },
        { name: "Settings", path: "/patterns/settings", description: "User preferences and configuration" },
        { name: "Forgiving Format", path: "/patterns/forgiving-format", description: "Accept various input formats" },
        { name: "Undo", path: "/patterns/undo", description: "Reverse user actions" },
        { name: "Input Prompt", path: "/patterns/input-prompt", description: "Guide users with helpful prompts" },
        { name: "Good Defaults", path: "/patterns/good-defaults", description: "Smart default values" },
      ]
    },
    // Explaining the process
    { 
      category: "Explaining the Process", 
      patterns: [
        { name: "Wizard", path: "/patterns/wizard", description: "Step-by-step guided processes" },
        { name: "Completeness Meter", path: "/patterns/completeness-meter", description: "Show progress towards completion" },
        { name: "Steps Left", path: "/patterns/steps-left", description: "Indicate remaining steps" },
        { name: "Inline Help Box", path: "/patterns/inline-help", description: "Contextual help and tips" },
      ]
    },
    // Navigation
    { 
      category: "Navigation", 
      patterns: [
        { name: "Tabs", path: "/patterns/tabs", description: "Organize content into sections" },
        { name: "Navigation Tabs", path: "/patterns/navigation-tabs", description: "Primary navigation tabs" },
        { name: "Module Tabs", path: "/patterns/module-tabs", description: "Secondary content tabs" },
        { name: "Jumping in Hierarchy", path: "/patterns/jumping-hierarchy", description: "Skip to different levels" },
        { name: "Breadcrumbs", path: "/patterns/breadcrumbs", description: "Show current location" },
        { name: "Shortcut Dropdown", path: "/patterns/shortcut-dropdown", description: "Quick access dropdown" },
        { name: "Fat Footer", path: "/patterns/fat-footer", description: "Comprehensive footer navigation" },
        { name: "Modal", path: "/patterns/modal", description: "Overlay dialogs and forms" },
        { name: "Notifications", path: "/patterns/notifications", description: "System and user notifications" },
        { name: "Home Link", path: "/patterns/home-link", description: "Return to main page" },
        { name: "Menus", path: "/patterns/menus", description: "Dropdown and context menus" },
        { name: "Vertical Dropdown Menu", path: "/patterns/vertical-dropdown", description: "Vertical menu layouts" },
        { name: "Accordion Menu", path: "/patterns/accordion-menu", description: "Expandable menu sections" },
        { name: "Horizontal Dropdown Menu", path: "/patterns/horizontal-dropdown", description: "Horizontal menu layouts" },
      ]
    },
    // Content
    { 
      category: "Content", 
      patterns: [
        { name: "Adaptable View", path: "/patterns/adaptable-view", description: "Responsive content layouts" },
        { name: "Article List", path: "/patterns/article-list", description: "List of articles and posts" },
        { name: "Pagination", path: "/patterns/pagination", description: "Navigate through pages" },
        { name: "Tagging", path: "/patterns/tagging", description: "Add labels and categories" },
        { name: "Categorization", path: "/patterns/categorization", description: "Organize content by type" },
        { name: "Tag Cloud", path: "/patterns/tag-cloud", description: "Visual tag representation" },
        { name: "Cards", path: "/patterns/cards", description: "Content in card format" },
        { name: "Carousel", path: "/patterns/carousel", description: "Rotating content slides" },
        { name: "Progressive Disclosure", path: "/patterns/progressive-disclosure", description: "Reveal content gradually" },
        { name: "Continuous Scrolling", path: "/patterns/continuous-scrolling", description: "Infinite scroll content" },
        { name: "Event Calendar", path: "/patterns/event-calendar", description: "Calendar with events" },
        { name: "Archive", path: "/patterns/archive", description: "Historical content access" },
        { name: "Thumbnail", path: "/patterns/thumbnail", description: "Small preview images" },
        { name: "Favorites", path: "/patterns/favorites", description: "Save and bookmark content" },
      ]
    },
    // Gestures
    { 
      category: "Gestures", 
      patterns: [
        { name: "Pull to Refresh", path: "/patterns/pull-refresh", description: "Refresh content with gestures" },
        { name: "Swipe Actions", path: "/patterns/swipe-actions", description: "Reveal actions with swipe gestures" },
        { name: "Pinch to Zoom", path: "/patterns/pinch-zoom", description: "Zoom content with pinch gestures" },
        { name: "Long Press", path: "/patterns/long-press", description: "Trigger actions with long press" },
        { name: "Double Tap", path: "/patterns/double-tap", description: "Quick actions with double tap" },
        { name: "Swipe Navigation", path: "/patterns/swipe-navigation", description: "Navigate between pages with swipes" },
        { name: "Drag to Reorder", path: "/patterns/drag-reorder", description: "Reorder items with drag gestures" },
        { name: "Tap to Expand", path: "/patterns/tap-expand", description: "Expand content with tap gestures" },
      ]
    },
    // Dealing with data
    { 
      category: "Dealing with Data", 
      patterns: [
        { name: "Tables", path: "/patterns/tables", description: "Organize data in rows and columns" },
        { name: "Sort By Column", path: "/patterns/sort-column", description: "Sort table data" },
        { name: "Table Filter", path: "/patterns/table-filter", description: "Filter table data" },
        { name: "Alternating Row Colors", path: "/patterns/alternating-rows", description: "Improve table readability" },
        { name: "Formatting Data", path: "/patterns/formatting-data", description: "Format data for display" },
        { name: "FAQ", path: "/patterns/faq", description: "Frequently asked questions" },
        { name: "Dashboard", path: "/patterns/dashboard", description: "Overview of key metrics" },
        { name: "Copy Box", path: "/patterns/copy-box", description: "Copy content to clipboard" },
      ]
    },
    // Images
    { 
      category: "Images", 
      patterns: [
        { name: "Gallery", path: "/patterns/gallery", description: "Image collections" },
        { name: "Slideshow", path: "/patterns/slideshow", description: "Image slideshows" },
        { name: "Image Zoom", path: "/patterns/image-zoom", description: "Zoom into images" },
      ]
    },
    // Search
    { 
      category: "Search", 
      patterns: [
        { name: "Autocomplete", path: "/patterns/autocomplete", description: "Search suggestions" },
        { name: "Search Filters", path: "/patterns/search-filters", description: "Filter search results" },
      ]
    },
  ];
}
