package org.dicadeveloper.weplantaforest.reports.co2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class Co2Controller {

	private @NonNull Co2Repository _co2Repository;

	@RequestMapping(value = "/reports/co2", method = RequestMethod.GET)
	public HttpEntity<?> getAmount() {
		Long countAmountOfTrees = _co2Repository.countAmountOfTrees();
		if (null == countAmountOfTrees) {
			countAmountOfTrees = Long.valueOf(0);
		}
		Double co2Saving = _co2Repository.getCo2Saving(System.currentTimeMillis());
		if (null == co2Saving) {
			co2Saving = Double.valueOf(0.0);
		}
		final Co2Resource resource = new Co2Resource(countAmountOfTrees, co2Saving);
		return new ResponseEntity<>(resource, HttpStatus.OK);
	}

	@Getter
	@AllArgsConstructor
	private class Co2Resource extends ResourceSupport {

		private Long treesCount;

		private Double co2;
	}
}
