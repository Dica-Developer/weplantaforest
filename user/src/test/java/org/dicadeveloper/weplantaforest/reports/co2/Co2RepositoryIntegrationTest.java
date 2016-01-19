package org.dicadeveloper.weplantaforest.reports.co2;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.assertj.core.data.Offset;
import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.trees.User;
import org.dicadeveloper.weplantaforest.trees.UserRepository;
import org.dicadeveloper.weplantaforest.treetypes.TreeType;
import org.dicadeveloper.weplantaforest.treetypes.TreeTypeRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class Co2RepositoryIntegrationTest {

	/**
	 * For performance reasons we shifted calculation of co2 from java to the
	 * database query. There is a slight but neglectable difference in the
	 * results. The expected test results are matching the java version.
	 */
	private static final Offset<Double> OK_DELTA_FOR_CO2_SAVING = Offset.offset(0.000001D);

	@Rule
	@Autowired
	public CleanDbRule _cleanDbRule;

	@Autowired
	private UserRepository _uUserRepository;

	@Autowired
	private TreeTypeRepository _treeTypeRepository;

	@Autowired
	private TreeRepository _treeRepository;

	@Autowired
	private Co2Repository _co2Repository;

	@Test
	public void testGetCo2OfAllTrees_NoTimeForSavingCo2() {
		TreeType treeTypeDto = new TreeType();
		treeTypeDto.setName("wood");
		treeTypeDto.setDescription("description");
		treeTypeDto.setAnnualCo2SavingInTons(0.5);
		_treeTypeRepository.save(treeTypeDto);

		User userDto = new User();
		userDto.setName("Bert");
		_uUserRepository.save(userDto);

		long timeOfPlanting = System.currentTimeMillis();
		Tree tree = new Tree();
		tree.setLatitude(0);
		tree.setLongitude(0);
		tree.setAmount(10);
		tree.setTreeType(treeTypeDto);
		tree.setPlantedOn(new Date(timeOfPlanting).getTime());
		tree.setSubmittedOn(new Date(timeOfPlanting).getTime());
		tree.setOwner(userDto);
		_treeRepository.save(tree);

		Double co2 = _co2Repository.getCo2Saving(timeOfPlanting);
		assertThat(co2).isEqualTo(0.0);
	}

	/**
	 * Same test as in TreeDaoImplTest.getCo2SavingByPlantingForPointInTime().
	 */
	@Test
	public void testGetCo2SavingByPlantingForPointInTime() {
		TreeType treeTypeDto = new TreeType();
		treeTypeDto.setName("wood");
		treeTypeDto.setDescription("description");
		treeTypeDto.setAnnualCo2SavingInTons(0.1);
		_treeTypeRepository.save(treeTypeDto);

		User userDto = new User();
		userDto.setName("Bert");
		_uUserRepository.save(userDto);

		Tree tree = new Tree();
		tree.setAmount(1);
		tree.setTreeType(treeTypeDto);
		tree.setPlantedOn(new Date(0).getTime());
		tree.setSubmittedOn(new Date(0).getTime());
		tree.setOwner(userDto);
		_treeRepository.save(tree);

		Double co2Dto = _co2Repository.getCo2Saving(1207077022876l);
		assertThat(co2Dto).isEqualTo(3.8276161874139056D, OK_DELTA_FOR_CO2_SAVING);
	}
}
