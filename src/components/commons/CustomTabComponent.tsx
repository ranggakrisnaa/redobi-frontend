import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type ReactNode } from 'react';

type TabItem = {
  label: string;
  value: string;
  icon: ReactNode;
  component?: ReactNode;
};

type CustomTabsProps = {
  tabs: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
};

const CustomTabs = ({ tabs, value, onValueChange }: CustomTabsProps) => {
  return (
    <div className="w-full mx-auto mt-3">
      <Tabs value={value} onValueChange={onValueChange} className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-transparent shadow-none p-0 h-auto rounded-none border-b-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative flex flex-col items-center justify-center py-4 px-4 text-sm font-medium text-gray-600 data-[state=active]:text-blue-600 bg-transparent shadow-none hover:bg-gray-50 hover:text-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all duration-300 rounded-md border-0 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-left data-[state=active]:after:scale-x-100"
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <div>{tab.component}</div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default CustomTabs;
