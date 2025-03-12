//C:\Users\sanjay\Downloads\project\src\components\PreferencesForm.tsx

import { Save } from 'lucide-react';

const AVAILABLE_TOPICS = ['Technology', 'Science', 'Business', 'Health', 'Politics'];
const NEWS_SOURCES = ['Tech Daily', 'Science Weekly', 'Business Insider', 'Health Today', 'Politics Hub'];

export function PreferencesForm() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">News Preferences</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics of Interest
          </label>
          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_TOPICS.map(topic => (
              <label key={topic} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>{topic}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords
          </label>
          <input
            type="text"
            placeholder="Enter keywords separated by commas"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            News Sources
          </label>
          <div className="grid grid-cols-2 gap-2">
            {NEWS_SOURCES.map(source => (
              <label key={source} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>{source}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Save className="h-5 w-5" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
}