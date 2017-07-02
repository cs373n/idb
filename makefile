ifeq ($(shell uname), Darwin)          # Apple 
    PYTHON   := python3.5 
    PIP      := pip3.5 
    PYLINT   := pylint 
    COVERAGE := coverage-3.5 
    PYDOC    := pydoc3.5 
    AUTOPEP8 := autopep8 
else ifeq ($(CI), true)                # Travis CI 
    PYTHON   := python3.5 
    PIP      := pip3.5 
    PYLINT   := pylint 
    COVERAGE := coverage 
    PYDOC    := pydoc3.5 
    AUTOPEP8 := autopep8 
else ifeq ($(shell uname -p), unknown) # Docker 
    PYTHON   := python3.5 
    PIP      := pip3.5 
    PYLINT   := pylint 
    COVERAGE := coverage-3.5 
    PYDOC    := pydoc3.5 
    AUTOPEP8 := autopep8 
else                                   # UTCS 
    PYTHON   := python3 
    PIP      := pip3 
    PYLINT   := pylint			#change back to pylint3 
    COVERAGE := coverage		#change back to coverage-3.5 
    PYDOC    := pydoc3.5 
    AUTOPEP8 := autopep8 
endif 


.pylintrc: 
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@ 

test: app/models.py app/tests.py .pylintrc
	#-$(PYLINT) app/models.py
	#-$(PYLINT) app/tests.py

	-$(COVERAGE) run --branch app/tests.py 
	-$(COVERAGE) report --include=app/models.py 
	-$(COVERAGE) report --include=app/idb.py
	-$(COVERAGE) report --include=app/tests.py
	python app/scrape/reset_database.py
	python app/models.py
	python app/tests.py

clean:
	rm -f app/*.pyc
	rm -f app/.coverage
	rm -f app/tests.tmp
	rm -f .pylintrc

