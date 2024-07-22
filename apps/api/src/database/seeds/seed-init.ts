import { runSeeders } from 'typeorm-extension';
import { seedDataSource, options } from '../data-source';

(async () => {
  await seedDataSource.initialize();
  await runSeeders(seedDataSource, options);
  await seedDataSource.destroy();
})();
