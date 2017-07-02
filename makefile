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
    COVERAGE := coverage-3.5 
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

	-$(COVERAGE) report -m app/tests.py app/models.py app/idb.py
	python app/tests.py

clean:
	rm -f app/*.pyc
	rm -f app/.coverage
	rm -f app/tests.tmp
	rm -f .pylintrc

