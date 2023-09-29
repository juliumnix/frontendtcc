export interface ProjectData {
  name: String;
  repositoryKey: String;
  ownerName: String;
  id: String;
  architecture: String;
  reactDependencies: DependeciesProps[];
  flutterDependencies: DependeciesProps[];
  needZIPFile: boolean;
}

export type DependeciesProps = {
  name: String;
  version: String;
};
