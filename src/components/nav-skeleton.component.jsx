import { Skeleton, Space } from '@/components/ui';

const AppNavigationSkeleton = () => {
  return (
    <nav className="bg-[#fdf3f3] py-1 px-10 md:px-30 lg:px-50 shadow-md z-10">
      <div className="flex justify-between items-center">
        {/* Logo Skeleton */}
        <div className="aspect-w-16 aspect-h-9">
          <Skeleton.Avatar shape="square" size={60} active />
        </div>

        {/* Desktop Menu Skeleton */}
        <div
          className="hidden md:flex space-x-8"
          style={{ alignItems: "center" }}
        >
          <Skeleton.Button
            active
            size="default"
            shape="round"
            style={{ width: 80 }}
          />
          <Skeleton.Button
            active
            size="default"
            shape="round"
            style={{ width: 80 }}
          />
          <Skeleton.Button
            active
            size="default"
            shape="round"
            style={{ width: 80 }}
          />
          <Skeleton.Button
            active
            size="default"
            shape="round"
            style={{ width: 80 }}
          />
          <Skeleton.Button
            active
            size="default"
            shape="round"
            style={{ width: 80 }}
          />
          <Space>
            <Skeleton.Button
              active
              size="small"
              shape="round"
              style={{ width: 50 }}
            />
            <Skeleton.Button
              active
              size="small"
              shape="round"
              style={{ width: 50 }}
            />
          </Space>
          <Skeleton.Avatar shape="circle" size={40} active />
        </div>

        {/* Mobile Menu Skeleton */}
        <div className="md:hidden">
          <Skeleton.Button
            active
            size="large"
            shape="round"
            style={{ width: 40, height: 40 }}
          />
        </div>
      </div>
    </nav>
  );
};

export default AppNavigationSkeleton;
